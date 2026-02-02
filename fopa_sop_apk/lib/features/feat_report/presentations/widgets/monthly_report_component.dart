import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/monthly_sales_model.dart';

class MonthlyReportComponent extends StatelessWidget {
  final MonthlySalesModel monthlySales;
  const MonthlyReportComponent({super.key, required this.monthlySales});

  @override
  Widget build(BuildContext context) {
    final monthNames = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];

    return Container(
      margin: EdgeInsets.only(bottom: 12),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: context.tertiary,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SimpleText(
                text:
                    "${monthNames[monthlySales.month - 1]} ${monthlySales.year}",
                size: 16,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              SimpleText(
                text: "${monthlySales.totalSales.toInt()} FCFA",
                size: 16,
                weight: FontWeight.bold,
                color: context.primaryColor,
              ),
            ],
          ),
          spacerHeight(12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _ReportItem(
                label: "Commandes",
                value: "${monthlySales.totalOrders}",
                context: context,
              ),
              _ReportItem(
                label: "Payé",
                value: "${monthlySales.totalAmountPaid.toInt()} FCFA",
                context: context,
              ),
              _ReportItem(
                label: "Dette",
                value: "${monthlySales.totalDebt.toInt()} FCFA",
                context: context,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ReportItem extends StatelessWidget {
  final String label;
  final String value;
  final BuildContext context;

  const _ReportItem({
    required this.label,
    required this.value,
    required this.context,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SimpleText(
          text: label,
          size: 12,
          color: this.context.titleLargeColor.withAppOppacity(0.7),
        ),
        spacerHeight(4),
        SimpleText(
          text: value,
          size: 14,
          weight: FontWeight.w600,
          color: this.context.titleLargeColor,
        ),
      ],
    );
  }
}
