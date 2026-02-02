import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';

class SummaryRowComponent extends StatelessWidget {
  final String label;
  final String value;
  final BuildContext context;
  final bool isBold;
  final Color? valueColor;

  const SummaryRowComponent({
    super.key,
    required this.label,
    required this.value,
    required this.context,
    this.isBold = false,
    this.valueColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SimpleText(
          text: label,
          size: 14,
          weight: isBold ? FontWeight.bold : FontWeight.normal,
          color: this.context.titleLargeColor,
        ),
        SimpleText(
          text: value,
          size: 14,
          weight: isBold ? FontWeight.bold : FontWeight.normal,
          color: valueColor ?? this.context.titleLargeColor,
        ),
      ],
    );
  }
}
