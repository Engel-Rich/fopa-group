import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/dtos/create_order_item_dto.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/add_product_dialog.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/custommer_search_component.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/order_product_component.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/order_sommary_component.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class OrderProduct {
  final ProductWithConfigModel product;
  int quantity;
  double unitPrice;

  OrderProduct({
    required this.product,
    required this.quantity,
    required this.unitPrice,
  });

  double get total => unitPrice * quantity;
}

class CreateOrderScreen extends StatefulWidget {
  const CreateOrderScreen({super.key});

  @override
  State<CreateOrderScreen> createState() => _CreateOrderScreenState();
}

class _CreateOrderScreenState extends State<CreateOrderScreen> {
  CustomerResponseModel? _selectedCustomer;
  final List<OrderProduct> _orderProducts = [];
  final _amountPaidController = TextEditingController();
  double _amountPaid = 0.0;

  @override
  void dispose() {
    _amountPaidController.dispose();
    super.dispose();
  }

  double get _totalProducts {
    return _orderProducts.fold(0.0, (sum, item) => sum + item.total);
  }

  double get _currentDebt {
    return _selectedCustomer?.currentDebt ?? 0.0;
  }

  double get _grandTotal {
    return _totalProducts + _currentDebt;
  }

  void _addProduct(ProductWithConfigModel product, int quantity) {
    final existingIndex = _orderProducts.indexWhere(
      (item) => item.product.id == product.id,
    );

    setState(() {
      if (existingIndex >= 0) {
        _orderProducts[existingIndex].quantity += quantity;
      } else {
        _orderProducts.add(
          OrderProduct(
            product: product,
            quantity: quantity,
            unitPrice: product.defaultUnitPrice,
          ),
        );
      }
    });
  }

  void _updateProductQuantity(int index, int quantity) {
    setState(() {
      if (quantity <= 0) {
        _orderProducts.removeAt(index);
      } else {
        _orderProducts[index].quantity = quantity;
      }
    });
  }

  void _removeProduct(int index) {
    setState(() {
      _orderProducts.removeAt(index);
    });
  }

  void _updateProductUnitPrice(int index, double unitPrice) {
    setState(() {
      _orderProducts[index].unitPrice = unitPrice;
    });
  }

  void _showAddProductDialog() {
    final productProvider = GetIt.instance<ProductProvider>();
    final customerProducts =
        productProvider.listProductsWithConfigState.data ?? [];

    showDialog(
      context: context,
      builder: (context) => AddProductDialog(
        onProductSelected: (product, quantity) {
          _addProduct(product, quantity);
        },
        products: customerProducts,
      ),
    );
  }

  void _showConfirmationDialog() {
    if (_selectedCustomer == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Veuillez sélectionner un client")),
      );
      return;
    }

    if (_orderProducts.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Veuillez ajouter au moins un produit")),
      );
      return;
    }

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: SimpleText(
          text: "Confirmer la commande",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: SimpleText(
          text: "Êtes-vous sûr de vouloir valider cette commande ?",
          color: context.titleLargeColor,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: SimpleText(text: "Annuler", color: context.titleLargeColor),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _handleValidate();
            },
            child: SimpleText(
              text: "Confirmer",
              color: context.secondaryColor,
              weight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _handleValidate() async {
    final orderProvider = context.read<OrderProvider>();

    // Créer le DTO de la commande
    final dto = CreateOrderDto(
      customerId: _selectedCustomer!.id,
      items: _orderProducts
          .map(
            (orderProduct) => CreateOrderItemDto(
              productId: orderProduct.product.id,
              quantity: orderProduct.quantity,
              unitPrice: orderProduct.unitPrice,
            ),
          )
          .toList(),
      amountPaid: _amountPaid,
    );

    // Créer la commande via le provider
    await orderProvider.createOrder(dto);

    if (orderProvider.createOrderState.hasError) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              orderProvider.createOrderState.errorModel?.error ??
                  "Erreur lors de la création de la commande",
            ),
          ),
        );
      }
    } else if (orderProvider.createOrderState.hasNotNullData) {
      if (mounted) {
        // Naviguer vers l'écran de récapitulatif avec l'OrderResponseModel
        context.pushNamed(
          AppRoutes.orderSummaryRoute,
          extra: orderProvider.createOrderState.data,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: SimpleText(
          text: "Créer une commande",
          color: context.titleLargeColor,
        ),
      ),
      body: Consumer<OrderProvider>(
        builder: (context, orderProvider, child) {
          return SingleChildScrollView(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CustomerSearchComponent(
                  selectedCustomer: _selectedCustomer,
                  onChanged: (customer) async {
                    setState(() {
                      _selectedCustomer = customer;
                      _orderProducts.clear();
                    });
                    if (customer != null) {
                      await GetIt.instance<ProductProvider>()
                          .listProductsWithConfig(
                            customer.id,
                            activeOnly: true,
                          );
                    }
                  },
                ),
                spacerHeight(12),
                Divider(color: context.tertiary, thickness: 5),
                spacerHeight(12),
                SimpleText(
                  text: "Produits de la commande",
                  size: 20,
                  weight: FontWeight.bold,
                  color: context.titleLargeColor,
                ),
                spacerHeight(15),
                if (_orderProducts.isEmpty)
                  Center(
                    child: Padding(
                      padding: EdgeInsets.all(40),
                      child: SimpleText(
                        text: "Aucun produit ajouté",
                        color: context.titleLargeColor.withAppOppacity(0.5),
                      ),
                    ),
                  )
                else
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    padding: EdgeInsets.zero,
                    itemCount: _orderProducts.length,
                    itemBuilder: (context, index) {
                      return OrderProductComponent(
                        product: _orderProducts[index].product,
                        quantity: _orderProducts[index].quantity,
                        unitPrice: _orderProducts[index].unitPrice,
                        onQuantityChanged: (qty) {
                          _updateProductQuantity(index, qty);
                        },
                        onUnitPriceChanged: (value) {
                          _updateProductUnitPrice(index, value);
                        },
                        onRemove: () {
                          _removeProduct(index);
                        },
                      );
                    },
                    separatorBuilder: (context, index) {
                      return Padding(
                        padding: EdgeInsets.symmetric(vertical: 5),
                        child: Divider(color: context.tertiary, thickness: 3),
                      );
                    },
                  ),
                spacerHeight(15),
                Divider(color: context.tertiary, thickness: 5),
                spacerHeight(15),
                OrderSummaryComponent(
                  totalProducts: _totalProducts,
                  currentDebt: _currentDebt,
                  amountPaid: _amountPaid,
                  grandTotal: _grandTotal,
                  onAmountPaidChanged: (value) {
                    setState(() {
                      _amountPaid = value;
                    });
                  },
                ),
                spacerHeight(24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    if (_selectedCustomer != null &&
                        _orderProducts.isNotEmpty) ...[
                      Expanded(
                        child: CustomAppPrimaryButton(
                          title: "Valider la commande",
                          onPressed: _showConfirmationDialog,
                          height: 55,
                          radius: 8,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          withDefaultLoader: true,
                          isLoading: orderProvider.createOrderState.isLoading,
                        ),
                      ),
                      spacerWidth(12),
                    ],
                    CustomAppPrimaryButton(
                      title: "+ Ajouter",
                      onPressed: _showAddProductDialog,
                      color: Colors.transparent,
                      border: Border.all(color: primaryColors),
                      height: 55,
                      width: 110,
                      radius: 8,
                      fontSize: 16,
                      textColor: context.titleLargeColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
                spacerHeight(20),
              ],
            ),
          );
        },
      ),
    );
  }
}
