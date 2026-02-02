import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/order_component.dart';
import 'package:provider/provider.dart';

class OrderHistoriqueScreen extends StatefulWidget {
  final CustomerResponseModel? customer;
  const OrderHistoriqueScreen({super.key, this.customer});

  @override
  State<OrderHistoriqueScreen> createState() => _OrderHistoriqueScreenState();
}

class _OrderHistoriqueScreenState extends State<OrderHistoriqueScreen> {
  int _currentPage = 1;
  final int _limit = 20;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadOrders();
    });
  }

  Future<void> _loadOrders() async {
    final orderProvider = context.read<OrderProvider>();
    await orderProvider.listOrders(
      page: _currentPage,
      limit: _limit,
      customerId: widget.customer?.id,
    );
  }

  void _handlePreviousPage() {
    if (_currentPage > 1) {
      setState(() {
        _currentPage--;
      });
      _loadOrders();
    }
  }

  void _handleNextPage() {
    final orderProvider = context.read<OrderProvider>();
    final totalPages =
        (orderProvider.listOrdersState.data?.total ?? 0) / _limit;
    if (_currentPage < totalPages.ceil()) {
      setState(() {
        _currentPage++;
      });
      _loadOrders();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: widget.customer != null
              ? "Historique - ${widget.customer!.user?.name ?? ''}"
              : "Historique des commandes",
          color: context.titleLargeColor,
        ),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            setState(() {
              _currentPage = 1;
            });
            await _loadOrders();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Consumer<OrderProvider>(
              builder: (context, orderProvider, child) {
                if (orderProvider.listOrdersState.isLoading &&
                    orderProvider.localOrders.isEmpty) {
                  return ListSkeleton();
                }

                if (orderProvider.localOrders.isEmpty) {
                  return Container(
                    padding: EdgeInsets.all(40),
                    child: Column(
                      children: [
                        SimpleText(
                          text: widget.customer != null
                              ? "Aucune commande pour ce client"
                              : "Aucune commande disponible",
                          size: 16,
                          color: context.titleLargeColor.withOpacity(0.7),
                          textAlign: TextAlign.center,
                        ),
                        spacerHeight(20),
                        CustomAppPrimaryButton(
                          title: "Actualiser",
                          onPressed: () {
                            setState(() {
                              _currentPage = 1;
                            });
                            _loadOrders();
                          },
                          width: SizeConfig.screenWidth * 0.5,
                          height: 45,
                          radius: 8,
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ],
                    ),
                  );
                }

                final totalPages =
                    (orderProvider.listOrdersState.data?.total ?? 0) / _limit;
                final hasNextPage = _currentPage < totalPages.ceil();
                final hasPreviousPage = _currentPage > 1;

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    spacerHeight(16),
                    if (orderProvider.listOrdersState.data != null)
                      SimpleText(
                        text:
                            "Total: ${orderProvider.listOrdersState.data!.total} commande(s)",
                        size: 14,
                        color: context.titleLargeColor.withOpacity(0.7),
                      ),
                    spacerHeight(12),
                    ...orderProvider.localOrders.map(
                      (order) => OrderComponent(
                        order: order,
                        onPaymentSuccess: _loadOrders,
                      ),
                    ),
                    spacerHeight(20),
                    // Pagination
                    if (totalPages > 1)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          CustomAppPrimaryButton(
                            title: "Précédent",
                            onPressed: _handlePreviousPage,
                            width: SizeConfig.screenWidth * 0.3,
                            height: 40,
                            radius: 8,
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            disabled: !hasPreviousPage,
                          ),
                          spacerWidth(16),
                          SimpleText(
                            text: "Page $_currentPage / ${totalPages.ceil()}",
                            size: 14,
                            color: context.titleLargeColor,
                            weight: FontWeight.w600,
                          ),
                          spacerWidth(16),
                          CustomAppPrimaryButton(
                            title: "Suivant",
                            onPressed: _handleNextPage,
                            width: SizeConfig.screenWidth * 0.3,
                            height: 40,
                            radius: 8,
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            disabled: !hasNextPage,
                          ),
                        ],
                      ),
                    spacerHeight(30),
                  ],
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
