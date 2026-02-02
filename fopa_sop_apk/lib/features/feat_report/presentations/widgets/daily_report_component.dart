import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/models/daily_sales_model.dart';

class DailyReportComponent extends StatelessWidget {
  final DailySalesModel dailySales;
  const DailyReportComponent({super.key, required this.dailySales});

  @override
  Widget build(BuildContext context) {
    // initialize date langage
    initializeDateFormatting("fr_FR");
    final dateFormat = DateFormat("EEE dd-MM-yyyy", "fr_FR");
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
                text: dateFormat.format(dailySales.date),
                size: 16,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              SimpleText(
                text: "${dailySales.totalSales.toInt()} FCFA",
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
                value: "${dailySales.totalOrders}",
                context: context,
              ),
              _ReportItem(
                label: "Payé",
                value: "${dailySales.totalAmountPaid.toInt()} FCFA",
                context: context,
              ),
              _ReportItem(
                label: "Dette",
                value: "${dailySales.totalDebt.toInt()} FCFA",
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
