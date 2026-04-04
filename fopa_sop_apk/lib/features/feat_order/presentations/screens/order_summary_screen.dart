import 'package:flutter/material.dart';
import 'package:dotted_line/dotted_line.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/create_order_screen.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/product_line_component.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/order_pdf_service.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/cores/widget/bottom_sheet_container.dart';
import 'package:fopa_sop_apk/cores/utils.dart';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'package:cross_file/cross_file.dart';
import 'package:provider/provider.dart';
import 'dart:io';

class OrderSummaryScreen extends StatelessWidget {
  final OrderResponseModel order;

  const OrderSummaryScreen({super.key, required this.order});

  double get _totalProducts {
    return order.items?.fold(0.0, (sum, item) => sum! + item.subtotal) ?? 0.0;
  }

  double get _salesTax {
    return _totalProducts * 0.10; // 10% de taxe
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
          ),
        ),
      ),
    );
  }
}

class _ReceiptBody extends StatelessWidget {
  final OrderResponseModel order;
  final double totalProducts;
  final double subTotal;
  final double salesTax;
  final double balance;

  const _ReceiptBody({
    required this.order,
    required this.totalProducts,
    required this.subTotal,
    required this.salesTax,
    required this.balance,
  });

  List<OrderProduct> get _orderProducts {
    if (order.items == null) return [];
    return order.items!.map((item) {
      return OrderProduct(
        product: ProductWithConfigModel.fromJson(item.toJson()),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      );
    }).toList();
  }

  void _showPrintShareBottomSheet(BuildContext context) {
    Utils.showButtomSheet(
      context,
      widget: BottomSheetContainer(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SimpleText(
              text: "Options de facture",
              size: 20,
              weight: FontWeight.bold,
              color: context.titleLargeColor,
            ),
            spacerHeight(20),
            CustomAppPrimaryButton(
              title: "Imprimer",
              onPressed: () async {
                Navigator.pop(context);
                try {
                  await OrderPdfService.generateAndPrintPdf(order: order);
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text("Erreur lors de l'impression: $e"),
                      ),
                    );
                  }
                }
              },
              height: 55,
              radius: 8,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
            spacerHeight(12),
            CustomAppPrimaryButton(
              title: "Partager",
              onPressed: () async {
                Navigator.pop(context);
                try {
                  final pdfBytes = await OrderPdfService.generatePdfBytes(
                    order: order,
                  );

                  final tempDir = await getTemporaryDirectory();
                  final file = File(
                    '${tempDir.path}/facture_${DateTime.now().millisecondsSinceEpoch}.pdf',
                  );
                  await file.writeAsBytes(pdfBytes);

                  final xFile = XFile(file.path);
                  await Share.shareXFiles([xFile], text: 'Facture FOPA SARL');
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Erreur lors du partage: $e")),
                    );
                  }
                }
              },
              height: 55,
              radius: 8,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
            spacerHeight(20),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final orderDate = order.createdAt;
    final dateFormat = DateFormat('dd-MM-yyyy');
    final timeFormat = DateFormat('HH:mm');

    return Container(
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Header
          SimpleText(
            text: "FOPAH ETS",
            size: 20,
            weight: FontWeight.bold,
            color: context.titleLargeColor,
          ),
          spacerHeight(12),
          SimpleText(
            text: "Client: ${order.customer?.user?.name ?? ''}",
            size: 12,
            color: context.titleLargeColor,
          ),
          SimpleText(
            text: "Tel: ${order.customer?.user?.phone ?? ''}",
            size: 12,
            color: context.titleLargeColor,
          ),
          spacerHeight(8),
          DottedLine(
            dashColor: context.titleLargeColor.withAppOppacity(0.3),
            dashGapLength: 4,
            dashRadius: 2,
            lineThickness: 1,
          ),
          spacerHeight(20),
          // Date and Time
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SimpleText(
                text: "Date: ${dateFormat.format(orderDate)}",
                size: 12,
                color: context.titleLargeColor,
              ),
              SimpleText(
                text: timeFormat.format(orderDate),
                size: 12,
                color: context.titleLargeColor,
              ),
            ],
          ),
          spacerHeight(8),
          DottedLine(
            dashColor: context.titleLargeColor.withAppOppacity(0.3),
            dashGapLength: 4,
            dashRadius: 2,
            lineThickness: 1,
          ),
          spacerHeight(12),
          // Products List
          ..._orderProducts.map((orderProduct) {
            return ProductLineComponent(orderProduct: orderProduct);
          }),
          spacerHeight(12),
          // Total with dotted line
          DottedLine(
            dashColor: context.titleLargeColor.withAppOppacity(0.5),
            dashGapLength: 3,
            dashRadius: 2,
            lineThickness: 1.5,
          ),
          spacerHeight(12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SimpleText(
                text: "Total",
                size: 16,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              SimpleText(
                text: "${balance.toInt()} FCFA",
                size: 16,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
            ],
          ),
          spacerHeight(12),
          // Sub-total, Sales Tax, Balance
          _ReceiptSummaryRow(
            label: "Total Produits",
            value: "${subTotal.toInt()} FCFA",
            context: context,
          ),
          spacerHeight(6),
          _ReceiptSummaryRow(
            label: "Dette ",
            value: "${order.previousDebt.toInt()} FCFA",
            context: context,
          ),
          spacerHeight(6),
          _ReceiptSummaryRow(
            label: "Montant payé ",
            value: "${order.amountPaid.toInt()} FCFA",
            context: context,
          ),
          spacerHeight(6),
          _ReceiptSummaryRow(
            label: "Total à Payer",
            value: "${balance.toInt()} FCFA",
            context: context,
          ),
          spacerHeight(30),
          // Footer
          SimpleText(
            text: "THANK YOU",
            size: 18,
            weight: FontWeight.bold,
            color: context.titleLargeColor,
          ),
          spacerHeight(20),
          Consumer<OrderProvider>(
            builder: (context, orderProvider, child) {
              return CustomAppPrimaryButton(
                title: "Valider la facture",
                onPressed: () {
                  _showPrintShareBottomSheet(context);
                },
                height: 55,
                radius: 8,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              );
            },
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
        SimpleText(text: label, size: 14, color: this.context.titleLargeColor),
        SimpleText(text: value, size: 14, color: this.context.titleLargeColor),
      ],
    );
  }
}
