import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/package_transaction_model.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/controllers/package_provider.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/widgets/package_transaction_tile.dart';
import 'package:provider/provider.dart';

/// Journal global des prêts / remboursements d'emballages.
class PackageJournalTab extends StatelessWidget {
  const PackageJournalTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<PackageProvider>(
      builder: (context, provider, _) {
        final state = provider.transactionsState;
        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Wrap(
                spacing: 8,
                children: [
                  _filterChip(context, provider, null, "Tout"),
                  _filterChip(
                    context,
                    provider,
                    PackageTransactionType.LEND,
                    "Prêts",
                  ),
                  _filterChip(
                    context,
                    provider,
                    PackageTransactionType.RETURN,
                    "Remboursements",
                  ),
                ],
              ),
            ),
            Expanded(
              child: RefreshIndicator(
                onRefresh: () => provider.loadTransactions(
                  type: provider.transactionsFilter,
                ),
                child: _buildList(
                  context,
                  provider,
                  state.isLoading,
                  state.hasError ? state.errorModel?.error : null,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _filterChip(
    BuildContext context,
    PackageProvider provider,
    PackageTransactionType? type,
    String label,
  ) {
    return ChoiceChip(
      label: Text(label),
      selected: provider.transactionsFilter == type,
      onSelected: (_) => provider.loadTransactions(type: type),
    );
  }

  Widget _buildList(
    BuildContext context,
    PackageProvider provider,
    bool isLoading,
    String? error,
  ) {
    if (isLoading) {
      return ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        children: const [
          Padding(
            padding: EdgeInsets.only(top: 40),
            child: Center(child: CircularProgressIndicator()),
          ),
        ],
      );
    }
    if (error != null || provider.transactions.isEmpty) {
      return ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        children: [
          Padding(
            padding: const EdgeInsets.all(40),
            child: SimpleText(
              text: error ?? "Aucune opération d'emballage",
              textAlign: TextAlign.center,
              color: context.titleLargeColor.withValues(alpha: 0.5),
            ),
          ),
        ],
      );
    }

    final items = provider.transactions;
    return NotificationListener<ScrollNotification>(
      onNotification: (n) {
        if (n.metrics.pixels >= n.metrics.maxScrollExtent - 200 &&
            provider.hasMoreTransactions) {
          provider.loadMoreTransactions();
        }
        return false;
      },
      child: ListView.separated(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: items.length + (provider.hasMoreTransactions ? 1 : 0),
        separatorBuilder: (_, _) =>
            Divider(color: context.tertiary, thickness: 2),
        itemBuilder: (context, index) {
          if (index >= items.length) {
            return const Padding(
              padding: EdgeInsets.all(16),
              child: Center(child: CircularProgressIndicator()),
            );
          }
          return PackageTransactionTile(
            transaction: items[index],
            showCustomer: true,
          );
        },
      ),
    );
  }
}
