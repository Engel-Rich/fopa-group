import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
// import 'package:fopa_sop_apk/features/feat_order/datas/models/fake_order.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
// import 'package:fopa_sop_apk/features/feat_product/domaines/controllers/product_provider.dart';
// import 'package:provider/provider.dart';

class AddProductDialog extends StatefulWidget {
  final Function(ProductResponseModel product, int quantity) onProductSelected;
  final List<ProductResponseModel> products;

  const AddProductDialog({
    super.key,
    required this.onProductSelected,
    required this.products,
  });

  @override
  State<AddProductDialog> createState() => _AddProductDialogState();
}

class _AddProductDialogState extends State<AddProductDialog> {
  ProductResponseModel? _selectedProduct;
  final _quantityController = TextEditingController(text: '1');
  int _quantity = 1;

  @override
  void dispose() {
    _quantityController.dispose();
    super.dispose();
  }

  void _handleAdd() {
    if (_selectedProduct == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Veuillez sélectionner un produit")),
      );
      return;
    }

    if (_quantity <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("La quantité doit être supérieure à 0")),
      );
      return;
    }

    widget.onProductSelected(_selectedProduct!, _quantity);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      insetPadding: EdgeInsets.symmetric(horizontal: 16),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SimpleText(
                text: "Ajouter un produit",
                size: 20,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              spacerHeight(20),
              SimpleText(text: "Produit", color: context.titleLargeColor),
              spacerHeight(8),
              _ProductSearchDropdown(
                selectedProduct: _selectedProduct,
                onChanged: (product) {
                  setState(() {
                    _selectedProduct = product;
                  });
                },
                products: widget.products,
              ),
              spacerHeight(20),
              SimpleText(text: "Quantité", color: context.titleLargeColor),
              spacerHeight(8),
              TextFieldApp(
                controller: _quantityController,
                hintText: "1",
                radius: 8,
                style: appTextStyle.copyWith(fontSize: 20),
                keyboardType: TextInputType.number,
                inputFormaters: [FilteringTextInputFormatter.digitsOnly],
                onchange: (value) {
                  final qty = int.tryParse(value) ?? 1;
                  setState(() {
                    _quantity = qty > 0 ? qty : 1;
                  });
                },
              ),
              spacerHeight(30),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: SimpleText(
                      text: "Annuler",
                      color: context.titleLargeColor,
                    ),
                  ),
                  spacerWidth(10),
                  CustomAppPrimaryButton(
                    title: "Ajouter",
                    onPressed: _handleAdd,
                    height: 45,
                    radius: 8,
                    width: 120,
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProductSearchDropdown extends StatefulWidget {
  final ProductResponseModel? selectedProduct;
  final ValueChanged<ProductResponseModel?> onChanged;
  final List<ProductResponseModel> products;
  const _ProductSearchDropdown({
    required this.selectedProduct,
    required this.onChanged,
    required this.products,
  });

  @override
  State<_ProductSearchDropdown> createState() => _ProductSearchDropdownState();
}

class _ProductSearchDropdownState extends State<_ProductSearchDropdown> {
  final _searchController = TextEditingController();
  bool _isOpen = false;
  List<ProductResponseModel> _filteredProducts = [];

  @override
  void initState() {
    super.initState();
    _filteredProducts = widget.products;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterProducts(String query) {
    setState(() {
      if (query.isEmpty) {
        _filteredProducts = widget.products;
      } else {
        _filteredProducts = widget.products
            .where(
              (product) =>
                  product.name.toLowerCase().contains(query.toLowerCase()),
            )
            .toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: () {
            setState(() {
              _isOpen = !_isOpen;
            });
          },
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: context.tertiary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: SimpleText(
                    text: widget.selectedProduct != null
                        ? "${widget.selectedProduct!.name} - ${widget.selectedProduct!.price.toInt()} FCFA"
                        : "Sélectionnez un produit",
                    color: widget.selectedProduct != null
                        ? context.titleLargeColor
                        : context.titleLargeColor.withAppOppacity(0.5),
                  ),
                ),
                Icon(
                  _isOpen ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                  color: context.titleLargeColor,
                ),
              ],
            ),
          ),
        ),
        if (_isOpen) ...[
          spacerHeight(8),
          Container(
            decoration: BoxDecoration(
              color: context.tertiary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.all(8),
                  child: TextFieldApp(
                    controller: _searchController,
                    hintText: "Rechercher...",
                    radius: 8,
                    prefixIcon: Icon(Icons.search),
                    style: appTextStyle.copyWith(fontSize: 20),
                    decoration: inputDecorationApp(context: context).copyWith(
                      hintText: "Rechercher...",
                      filled: false,
                      fillColor: Colors.transparent,
                      prefixIcon: Icon(Icons.search),
                      border: UnderlineInputBorder(),
                      enabledBorder: UnderlineInputBorder(),
                      focusedBorder: UnderlineInputBorder(),
                    ),
                    onchange: _filterProducts,
                  ),
                ),
                Container(
                  constraints: BoxConstraints(maxHeight: 200),
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: _filteredProducts.length,
                    itemBuilder: (context, index) {
                      final product = _filteredProducts[index];
                      return ListTile(
                        title: SimpleText(
                          text: product.name,
                          size: 20,
                          color: context.titleLargeColor,
                        ),
                        subtitle: SimpleText(
                          text: "${product.price.toInt()} FCFA",
                          size: 16,
                          color: context.titleLargeColor.withAppOppacity(0.7),
                        ),
                        onTap: () {
                          widget.onChanged(product);
                          setState(() {
                            _isOpen = false;
                            _searchController.clear();
                            _filteredProducts = widget.products;
                          });
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }
}
