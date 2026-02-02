import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/summary_row_component.dart';

class OrderSummaryComponent extends StatelessWidget {
  final double totalProducts;
  final double currentDebt;
  final double amountPaid;
  final double grandTotal;
  final ValueChanged<double> onAmountPaidChanged;
  final int packages;
  final ValueChanged<int> onPackagesChanged;

  const OrderSummaryComponent({
    super.key,
    required this.totalProducts,
    required this.currentDebt,
    required this.amountPaid,
    required this.grandTotal,
    required this.onAmountPaidChanged,
    this.packages = 0,
    required this.onPackagesChanged,
  });

  void _showEditDialog(BuildContext context, {bool isAmountPaid = true}) {
    final amountController = TextEditingController(
      text: amountPaid > 0 ? amountPaid.toInt().toString() : '',
    );
    final packagesController = TextEditingController(
      text: packages > 0 ? packages.toString() : '',
    );

    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: SimpleText(
          text: isAmountPaid ? "Montant payé" : "Nombre d'emballages",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isAmountPaid) ...[
              SimpleText(
                text: "Montant payé (FCFA)",
                color: context.titleLargeColor,
              ),
              spacerHeight(8),
              TextFieldApp(
                controller: amountController,
                decoration: inputDecorationApp(
                  context: context,
                ).copyWith(hintText: "0"),
                radius: 8,
                keyboardType: TextInputType.number,
                inputFormaters: [FilteringTextInputFormatter.digitsOnly],
                style: appTextStyle.copyWith(fontSize: 20),
                onchange: (_) {},
                containsPadding: EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
              ),
              spacerHeight(16),
            ] else ...[
              SimpleText(
                text: "Nombre d'emballages",
                color: context.titleLargeColor,
              ),
              spacerHeight(8),
              TextFieldApp(
                controller: packagesController,
                decoration: inputDecorationApp(
                  context: context,
                ).copyWith(hintText: "0"),
                radius: 8,
                keyboardType: TextInputType.number,
                inputFormaters: [FilteringTextInputFormatter.digitsOnly],
                style: appTextStyle.copyWith(fontSize: 20),
                onchange: (_) {},
                containsPadding: EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
              ),
              spacerHeight(16),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: SimpleText(text: "Annuler", color: context.titleLargeColor),
          ),
          TextButton(
            onPressed: () {
              onAmountPaidChanged(double.tryParse(amountController.text) ?? 0);
              onPackagesChanged(int.tryParse(packagesController.text) ?? 0);
              Navigator.of(dialogContext).pop();
            },
            child: SimpleText(
              text: "Valider",
              color: context.primaryColor,
              weight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: context.tertiary,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SummaryRowComponent(
            label: "Total Produits:",
            value: "${totalProducts.toInt()} FCFA",
            context: context,
            isBold: true,
          ),
          spacerHeight(8),
          SummaryRowComponent(
            label: "Dette Actuelle:",
            value: "${currentDebt.toInt()} FCFA",
            context: context,
            isBold: true,
          ),
          spacerHeight(8),
          const Divider(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SimpleText(text: "Montant Payé:", color: context.titleLargeColor),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SimpleText(
                    text: "${amountPaid.toInt()} F",
                    weight: FontWeight.w600,
                    color: context.titleLargeColor,
                  ),
                  spacerWidth(3),
                  InkWell(
                    onTap: () => _showEditDialog(context, isAmountPaid: true),
                    borderRadius: BorderRadius.circular(20),
                    child: Padding(
                      padding: EdgeInsets.all(4),
                      child: Icon(
                        Icons.edit,
                        size: 20,
                        color: context.primaryColor,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          spacerHeight(8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SimpleText(text: "Emballages:", color: context.titleLargeColor),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SimpleText(
                    text: "$packages",
                    size: 14,
                    weight: FontWeight.w600,
                    color: context.titleLargeColor,
                  ),
                  spacerWidth(6),
                  InkWell(
                    onTap: () => _showEditDialog(context, isAmountPaid: false),
                    borderRadius: BorderRadius.circular(20),
                    child: Padding(
                      padding: EdgeInsets.all(4),
                      child: Icon(
                        Icons.edit,
                        size: 20,
                        color: context.primaryColor,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          spacerHeight(12),
          Divider(),
          spacerHeight(12),
          SummaryRowComponent(
            label: "Total Général:",
            value: "${grandTotal.toInt()} FCFA",
            context: context,
            isBold: true,
            valueColor: context.primaryColor,
          ),
        ],
      ),
    );
  }
}
