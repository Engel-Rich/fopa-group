import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';

String formatPackageDate(DateTime date) {
  return "${date.day.toString().padLeft(2, '0')}/"
      "${date.month.toString().padLeft(2, '0')}/"
      "${date.year} "
      "${date.hour.toString().padLeft(2, '0')}:"
      "${date.minute.toString().padLeft(2, '0')}";
}

class PackageTransactionTile extends StatelessWidget {
  final PackageTransactionModel transaction;

  /// Affiche le nom du client (journal global) au lieu du libellé seul.
  final bool showCustomer;

  const PackageTransactionTile({
    super.key,
    required this.transaction,
    this.showCustomer = false,
  });

  @override
  Widget build(BuildContext context) {
    final tx = transaction;
    final isLend = tx.type == PackageTransactionType.LEND;
    final color = isLend ? Colors.orange : Colors.green;
    final label = isLend ? "Prêt" : "Remboursement";

    final subtitleParts = <String>[
      if (showCustomer) label,
      if (tx.userName != null && tx.userName!.isNotEmpty) "par ${tx.userName}",
      if (tx.notes != null && tx.notes!.isNotEmpty) tx.notes!,
    ];

    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: 0.15),
        child: Icon(
          isLend ? Icons.arrow_upward : Icons.arrow_downward,
          color: color,
          size: 20,
        ),
      ),
      title: SimpleText(
        text: showCustomer ? (tx.customerName ?? 'Client') : label,
        weight: FontWeight.w600,
        color: context.titleLargeColor,
      ),
      subtitle: subtitleParts.isEmpty
          ? null
          : SimpleText(
              text: subtitleParts.join(" · "),
              size: 12,
              color: context.titleLargeColor.withValues(alpha: 0.6),
            ),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          SimpleText(
            text: "${isLend ? '+' : '-'}${tx.quantity}",
            size: 16,
            weight: FontWeight.bold,
            color: color,
          ),
          SimpleText(
            text: formatPackageDate(tx.createdAt),
            size: 11,
            color: context.titleLargeColor.withValues(alpha: 0.5),
          ),
        ],
      ),
    );
  }
}
