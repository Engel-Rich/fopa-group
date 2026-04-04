import 'package:flutter/material.dart';
import 'package:dotted_line/dotted_line.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/services/printing_service.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/create_order_screen.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/product_line_component.dart';
// import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

class OrderSummaryPrintScreen extends StatelessWidget {
  final OrderResponseModel order;

  const OrderSummaryPrintScreen({super.key, required this.order});

  double get _totalProducts {
    return order.items?.fold(0.0, (sum, item) => sum! + item.subtotal) ?? 0.0;
  }

  double get _salesTax {
    return _totalProducts * 0.10;
  }

  double get _subTotal {
    return order.subtotal;
  }

  double get _balance {
    return order.totalAmount;
  }

  @override
  Widget build(BuildContext context) {
    if (order.customer == null) {
      return Scaffold(
        appBar: AppBar(
          title: SimpleText(text: "Erreur", color: context.titleLargeColor),
        ),
        body: Center(
          child: SimpleText(
            text: "Données de commande invalides",
            color: context.titleLargeColor,
          ),
        ),
      );
    }

    return PopScope(
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) {
          context.pushReplacementNamed(AppRoutes.homeRoute);
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: SimpleText(
            text: "Récapitulatif de la Commande",
            color: context.titleLargeColor,
          ),
        ),
        body: SingleChildScrollView(
          child: _ReceiptBody(
            order: order,
            totalProducts: _totalProducts,
            subTotal: _subTotal,
            salesTax: _salesTax,
            balance: _balance,
            onPrint: () async {
              try {
                // await printImage("assets/logoap.jpg");
                await printWidget(context);
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Impression envoyée")),
                  );
                }
              } catch (e) {
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text("Erreur lors de l'impression: $e")),
                  );
                }
              }
            },
          ),
        ),
      ),
    );
  }
}

class _ReceiptBody extends StatefulWidget {
  final OrderResponseModel order;
  final double totalProducts;
  final double subTotal;
  final double salesTax;
  final double balance;
  final VoidCallback onPrint;

  const _ReceiptBody({
    required this.order,
    required this.totalProducts,
    required this.subTotal,
    required this.salesTax,
    required this.balance,
    required this.onPrint,
  });

  @override
  State<_ReceiptBody> createState() => _ReceiptBodyState();
}

class _ReceiptBodyState extends State<_ReceiptBody> {
  bool isLoadingPrint = false;

  void setsLoadingPrint() {
    isLoadingPrint = !isLoadingPrint;
    setState(() {});
  }

  List<OrderProduct> get _orderProducts {
    if (widget.order.items == null) return [];
    return widget.order.items!.map((item) {
      return OrderProduct(
        product: ProductWithConfigModel.fromJson(item.toJson()),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final orderDate = widget.order.createdAt;
    final dateFormat = DateFormat('dd-MM-yyyy');
    final timeFormat = DateFormat('HH:mm');

    return Container(
      padding: EdgeInsets.symmetric(vertical: 20),
      child: Column(
        children: [
          RepaintBoundary(
            key: repaintBoundaryKey,
            child: Container(
              color: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    "assets/logo_c.png",
                    width: 100,
                    height: 100,
                    fit: BoxFit.contain,
                    color: blackColor,
                  ),
                  spacerHeight(12),
                  SimpleText(
                    text: "FOPA SARL",
                    size: 24,
                    weight: FontWeight.w900,
                    color: blackColor,
                  ),
                  spacerHeight(12),
                  SimpleText(
                    text: "Client: ${widget.order.customer?.user?.name ?? ''}",
                    size: 15,
                    color: blackColor,
                    weight: FontWeight.w500,
                  ),
                  SimpleText(
                    text: "Tel: ${widget.order.customer?.user?.phone ?? ''}",
                    size: 15,
                    color: blackColor,
                  ),
                  spacerHeight(15),
                  DottedLine(
                    dashColor: blackColor,
                    dashGapLength: 4,
                    dashRadius: 2,
                    lineThickness: 1,
                  ),
                  spacerHeight(20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SimpleText(
                        text: "Date: ${dateFormat.format(orderDate)}",
                        size: 15,
                        color: blackColor,
                        weight: FontWeight.w500,
                      ),
                      SimpleText(
                        text: timeFormat.format(orderDate),
                        size: 15,
                        color: blackColor,
                        weight: FontWeight.w500,
                      ),
                    ],
                  ),
                  spacerHeight(15),
                  DottedLine(
                    dashColor: blackColor,
                    dashGapLength: 4,
                    dashRadius: 2,
                    lineThickness: 1,
                  ),
                  spacerHeight(15),
                  ..._orderProducts.map((orderProduct) {
                    return ProductLineComponent(orderProduct: orderProduct);
                  }),
                  spacerHeight(15),
                  DottedLine(
                    dashColor: blackColor,
                    dashGapLength: 3,
                    dashRadius: 2,
                    lineThickness: 1,
                  ),
                  spacerHeight(15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SimpleText(
                        text: "Total",
                        size: 18,
                        weight: FontWeight.bold,
                        color: blackColor,
                      ),
                      SimpleText(
                        text: "${widget.balance.toInt()} FCFA",
                        size: 18,
                        weight: FontWeight.bold,
                        color: blackColor,
                      ),
                    ],
                  ),
                  spacerHeight(12),
                  _ReceiptSummaryRow(
                    label: "Total Produits",
                    value: "${widget.subTotal.toInt()} FCFA",
                    context: context,
                  ),
                  spacerHeight(6),
                  _ReceiptSummaryRow(
                    label: "Dette ",
                    value: "${widget.order.previousDebt.toInt()} FCFA",
                    context: context,
                  ),
                  spacerHeight(6),
                  _ReceiptSummaryRow(
                    label: "Montant payé ",
                    value: "${widget.order.amountPaid.toInt()} FCFA",
                    context: context,
                  ),
                  spacerHeight(6),
                  _ReceiptSummaryRow(
                    label: "Total à Payer",
                    value: "${widget.balance.toInt()} FCFA",
                    context: context,
                  ),
                  spacerHeight(20),
                  // Image.asset("assets/logoap.jpg", width: 100, height: 100),
                  // spacerHeight(20),
                  SimpleText(
                    text: "THANK YOU",
                    size: 18,
                    weight: FontWeight.bold,
                    color: blackColor,
                  ),
                  spacerHeight(60),
                ],
              ),
            ),
          ),
          spacerHeight(20),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: CustomAppPrimaryButton(
              title: "Imprimer",
              onPressed: () async {
                setsLoadingPrint();
                widget.onPrint.call();
                await Future.delayed(const Duration(seconds: 2));
                setsLoadingPrint();
              },
              height: 55,
              radius: 8,
              fontSize: 16,
              fontWeight: FontWeight.w600,
              withDefaultLoader: true,
              isLoading: isLoadingPrint,
            ),
          ),
          spacerHeight(30),
        ],
      ),
    );
  }
}

class _ReceiptSummaryRow extends StatelessWidget {
  final String label;
  final String value;
  final BuildContext context;

  const _ReceiptSummaryRow({
    required this.label,
    required this.value,
    required this.context,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SimpleText(
          text: label,
          size: 17,
          color: this.context.titleLargeColor,
          weight: FontWeight.w500,
        ),
        SimpleText(
          text: value,
          size: 17,
          color: this.context.titleLargeColor,
          weight: FontWeight.w600,
        ),
      ],
    );
  }
}
