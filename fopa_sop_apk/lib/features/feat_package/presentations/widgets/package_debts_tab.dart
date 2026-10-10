import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debts_summary_model.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/controllers/package_provider.dart';
import 'package:provider/provider.dart';

/// Vue d'ensemble des dettes d'emballages (tous clients confondus).
class PackageDebtsTab extends StatelessWidget {
  final ValueChanged<PackageDebtorModel> onDebtorSelected;

  const PackageDebtsTab({super.key, required this.onDebtorSelected});

  @override
  Widget build(BuildContext context) {
    return Consumer<PackageProvider>(
      builder: (context, provider, _) {
        final state = provider.debtsSummaryState;
        return RefreshIndicator(
          onRefresh: provider.loadDebtsSummary,
          child: ListView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.all(16),
            children: [
              if (state.isLoading && state.data == null)
                const Padding(
                  padding: EdgeInsets.only(top: 40),
                  child: Center(child: CircularProgressIndicator()),
                )
              else if (state.hasError)
                _Message(
                  icon: Icons.error_outline,
                  text:
                      state.errorModel?.error ??
                      "Erreur de chargement des dettes d'emballages",
                )
              else if (state.data != null) ...[
                _SummaryCards(summary: state.data!),
                const SizedBox(height: 24),
                SimpleText(
                  text: "Clients débiteurs",
                  size: 18,
                  weight: FontWeight.bold,
                  color: context.titleLargeColor,
                ),
                const SizedBox(height: 8),
                if (state.data!.customers.isEmpty)
                  const _Message(
                    icon: Icons.check_circle_outline,
                    text: "Aucun client ne doit d'emballages",
                  )
                else
                  ...state.data!.customers.map(
                    (debtor) => Column(
                      children: [
                        ListTile(
                          contentPadding: EdgeInsets.zero,
                          leading: CircleAvatar(
                            backgroundColor: Colors.orange.withValues(
                              alpha: 0.15,
                            ),
                            child: const Icon(
                              Icons.inventory_2_outlined,
                              color: Colors.orange,
                              size: 20,
                            ),
                          ),
                          title: SimpleText(
                            text: debtor.name,
                            weight: FontWeight.w600,
                            color: context.titleLargeColor,
                          ),
                          subtitle: (debtor.phone ?? '').isEmpty
                              ? null
                              : SimpleText(
                                  text: debtor.phone!,
                                  size: 12,
                                  color: context.titleLargeColor.withValues(
                                    alpha: 0.6,
                                  ),
                                ),
                          trailing: SimpleText(
                            text: "${debtor.currentPackagesDebt}",
                            size: 18,
                            weight: FontWeight.bold,
                            color: Colors.orange,
                          ),
                          onTap: () => onDebtorSelected(debtor),
                        ),
                        Divider(color: context.tertiary, thickness: 2),
                      ],
                    ),
                  ),
              ],
            ],
          ),
        );
      },
    );
  }
}

class _SummaryCards extends StatelessWidget {
  final PackagesDebtsSummaryModel summary;

  const _SummaryCards({required this.summary});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: context.tertiary,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SimpleText(
                text: "Emballages dehors (total dû)",
                size: 14,
                color: context.titleLargeColor.withValues(alpha: 0.7),
              ),
              const SizedBox(height: 6),
              SimpleText(
                text: "${summary.totalPackagesDebt} emballage(s)",
                size: 28,
                weight: FontWeight.bold,
                color: summary.totalPackagesDebt > 0
                    ? Colors.orange
                    : Colors.green,
              ),
              const SizedBox(height: 4),
              SimpleText(
                text: "${summary.debtorsCount} client(s) concerné(s)",
                size: 13,
                color: context.titleLargeColor.withValues(alpha: 0.7),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _StatTile(
                label: "Total prêté",
                value: summary.totalLent,
                color: Colors.orange,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _StatTile(
                label: "Total remboursé",
                value: summary.totalReturned,
                color: Colors.green,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _StatTile extends StatelessWidget {
  final String label;
  final int value;
  final Color color;

  const _StatTile({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: context.tertiary,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SimpleText(
            text: label,
            size: 12,
            color: context.titleLargeColor.withValues(alpha: 0.7),
          ),
          const SizedBox(height: 4),
          SimpleText(
            text: "$value",
            size: 20,
            weight: FontWeight.bold,
            color: color,
          ),
        ],
      ),
    );
  }
}

class _Message extends StatelessWidget {
  final IconData icon;
  final String text;

  const _Message({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 40),
      child: Column(
        children: [
          Icon(
            icon,
            size: 56,
            color: context.titleLargeColor.withValues(alpha: 0.25),
          ),
          const SizedBox(height: 12),
          SimpleText(
            text: text,
            textAlign: TextAlign.center,
            color: context.titleLargeColor.withValues(alpha: 0.5),
          ),
        ],
      ),
    );
  }
}
