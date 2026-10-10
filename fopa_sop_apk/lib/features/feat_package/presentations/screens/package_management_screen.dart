import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/controllers/customer_provider.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/custommer_search_component.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/lend_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/dtos/return_packages_dto.dart';
import 'package:fopa_sop_apk/features/feat_package/datas/models/packages_debts_summary_model.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/controllers/package_provider.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/widgets/package_debts_tab.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/widgets/package_journal_tab.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/widgets/package_transaction_tile.dart';
import 'package:provider/provider.dart';

/// Module Emballages.
///
/// Les dettes d'emballages (quantités) sont totalement indépendantes des
/// dettes produits (montants en FCFA) gérées par les commandes.
class PackageManagementScreen extends StatefulWidget {
  /// Client présélectionné (ex : ouverture depuis une commande).
  final CustomerResponseModel? initialCustomer;

  const PackageManagementScreen({super.key, this.initialCustomer});

  @override
  State<PackageManagementScreen> createState() =>
      _PackageManagementScreenState();
}

class _PackageManagementScreenState extends State<PackageManagementScreen>
    with SingleTickerProviderStateMixin {
  static const int _debtsTab = 0;
  static const int _customerTab = 1;
  static const int _journalTab = 2;

  late final TabController _tabController;
  CustomerResponseModel? _selectedCustomer;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
      length: 3,
      vsync: this,
      initialIndex: widget.initialCustomer != null ? _customerTab : _debtsTab,
    );
    _tabController.addListener(_onTabChanged);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final provider = context.read<PackageProvider>();
      if (widget.initialCustomer != null) {
        _onCustomerSelected(widget.initialCustomer);
      } else {
        // Évite d'afficher les données d'un client d'une visite précédente
        provider.clearSelectedCustomer();
      }
      provider.loadDebtsSummary();
    });
  }

  @override
  void dispose() {
    _tabController.removeListener(_onTabChanged);
    _tabController.dispose();
    super.dispose();
  }

  void _onTabChanged() {
    if (_tabController.indexIsChanging) return;
    if (_tabController.index == _journalTab) {
      final provider = context.read<PackageProvider>();
      if (provider.transactionsState.status == AppStatus.starting) {
        provider.loadTransactions(type: provider.transactionsFilter);
      }
    }
  }

  void _onCustomerSelected(CustomerResponseModel? customer) {
    setState(() {
      _selectedCustomer = customer;
    });
    if (customer != null) {
      final provider = context.read<PackageProvider>();
      provider.getPackagesDebt(customer.id);
      provider.getPackagesHistory(customer.id);
    }
  }

  void _onDebtorSelected(PackageDebtorModel debtor) {
    final known = context.read<CustomerProvider>().localCustomers.where(
      (c) => c.id == debtor.customerId,
    );
    final customer = known.isNotEmpty
        ? known.first
        : CustomerResponseModel(
            id: debtor.customerId,
            userId: '',
            user: UserResponseModel(
              id: '',
              name: debtor.name,
              phone: debtor.phone,
              username: '',
              role: UserRole.CLIENT,
            ),
            address: debtor.address,
            currentDebt: 0,
            currentPackagesDebt: debtor.currentPackagesDebt,
          );
    _onCustomerSelected(customer);
    _tabController.animateTo(_customerTab);
  }

  void _showLendDialog() {
    final controller = TextEditingController();
    final notesController = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: SimpleText(
          text: "Prêter des emballages",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SimpleText(text: "Quantité", color: context.titleLargeColor),
            const SizedBox(height: 8),
            TextFieldApp(
              controller: controller,
              decoration: inputDecorationApp(
                context: context,
              ).copyWith(hintText: "0"),
              radius: 8,
              keyboardType: TextInputType.number,
              inputFormaters: [FilteringTextInputFormatter.digitsOnly],
              style: appTextStyle.copyWith(fontSize: 18),
              onchange: (_) {},
              containsPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8,
              ),
            ),
            const SizedBox(height: 12),
            SimpleText(
              text: "Note (optionnel)",
              color: context.titleLargeColor,
            ),
            const SizedBox(height: 8),
            TextFieldApp(
              controller: notesController,
              decoration: inputDecorationApp(
                context: context,
              ).copyWith(hintText: "Ex: livraison du 25/04"),
              radius: 8,
              keyboardType: TextInputType.text,
              style: appTextStyle.copyWith(fontSize: 14),
              onchange: (_) {},
              containsPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: SimpleText(text: "Annuler", color: context.titleLargeColor),
          ),
          TextButton(
            onPressed: () async {
              final qty = int.tryParse(controller.text) ?? 0;
              if (qty <= 0) return;
              Navigator.pop(ctx);
              final provider = context.read<PackageProvider>();
              final result = await provider.lendPackages(
                LendPackagesDto(
                  customerId: _selectedCustomer!.id,
                  quantity: qty,
                  notes: notesController.text.trim().isEmpty
                      ? null
                      : notesController.text.trim(),
                ),
              );
              if (!mounted) return;
              if (result.hasError) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      result.errorModel?.error ??
                          "Erreur lors du prêt d'emballages",
                    ),
                    backgroundColor: Colors.red,
                  ),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Emballages prêtés avec succès"),
                    backgroundColor: Colors.green,
                  ),
                );
              }
            },
            child: SimpleText(
              text: "Confirmer",
              color: context.primaryColor,
              weight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _showReturnDialog() {
    final controller = TextEditingController();
    final notesController = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: SimpleText(
          text: "Rembourser des emballages",
          weight: FontWeight.bold,
          color: context.titleLargeColor,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SimpleText(text: "Quantité", color: context.titleLargeColor),
            const SizedBox(height: 8),
            TextFieldApp(
              controller: controller,
              decoration: inputDecorationApp(
                context: context,
              ).copyWith(hintText: "0"),
              radius: 8,
              keyboardType: TextInputType.number,
              inputFormaters: [FilteringTextInputFormatter.digitsOnly],
              style: appTextStyle.copyWith(fontSize: 18),
              onchange: (_) {},
              containsPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8,
              ),
            ),
            const SizedBox(height: 12),
            SimpleText(
              text: "Note (optionnel)",
              color: context.titleLargeColor,
            ),
            const SizedBox(height: 8),
            TextFieldApp(
              controller: notesController,
              decoration: inputDecorationApp(
                context: context,
              ).copyWith(hintText: "Ex: retour du 25/04"),
              radius: 8,
              keyboardType: TextInputType.text,
              style: appTextStyle.copyWith(fontSize: 14),
              onchange: (_) {},
              containsPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 8,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: SimpleText(text: "Annuler", color: context.titleLargeColor),
          ),
          TextButton(
            onPressed: () async {
              final qty = int.tryParse(controller.text) ?? 0;
              if (qty <= 0) return;
              Navigator.pop(ctx);
              final provider = context.read<PackageProvider>();
              final result = await provider.returnPackages(
                ReturnPackagesDto(
                  customerId: _selectedCustomer!.id,
                  quantity: qty,
                  notes: notesController.text.trim().isEmpty
                      ? null
                      : notesController.text.trim(),
                ),
              );
              if (!mounted) return;
              if (result.hasError) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      result.errorModel?.error ??
                          "Erreur lors du remboursement",
                    ),
                    backgroundColor: Colors.red,
                  ),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Remboursement enregistré avec succès"),
                    backgroundColor: Colors.green,
                  ),
                );
              }
            },
            child: SimpleText(
              text: "Confirmer",
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
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: "Dettes d'emballages",
          color: context.titleLargeColor,
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: context.titleLargeColor,
          unselectedLabelColor: context.titleLargeColor.withValues(alpha: 0.5),
          tabs: const [
            Tab(text: "Dettes"),
            Tab(text: "Client"),
            Tab(text: "Journal"),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          PackageDebtsTab(onDebtorSelected: _onDebtorSelected),
          _buildCustomerTab(),
          const PackageJournalTab(),
        ],
      ),
    );
  }

  Widget _buildCustomerTab() {
    return Consumer<PackageProvider>(
      builder: (context, provider, _) {
        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CustomerSearchComponent(
                selectedCustomer: _selectedCustomer,
                onChanged: _onCustomerSelected,
              ),
              const SizedBox(height: 20),
              if (_selectedCustomer != null) ...[
                // Debt card
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: context.tertiary,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: provider.debtState.isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SimpleText(
                              text: "Dette d'emballages",
                              size: 14,
                              color: context.titleLargeColor.withValues(
                                alpha: 0.7,
                              ),
                            ),
                            const SizedBox(height: 6),
                            SimpleText(
                              text:
                                  "${provider.debtState.data?.currentPackagesDebt ?? 0} emballage(s)",
                              size: 28,
                              weight: FontWeight.bold,
                              color:
                                  (provider
                                              .debtState
                                              .data
                                              ?.currentPackagesDebt ??
                                          0) >
                                      0
                                  ? Colors.orange
                                  : Colors.green,
                            ),
                          ],
                        ),
                ),
                const SizedBox(height: 16),
                // Action buttons
                Row(
                  children: [
                    Expanded(
                      child: CustomAppPrimaryButton(
                        title: "Prêter",
                        onPressed: () {
                          if (!provider.lendState.isLoading) {
                            _showLendDialog();
                          }
                        },
                        height: 50,
                        radius: 8,
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        withDefaultLoader: true,
                        isLoading: provider.lendState.isLoading,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: CustomAppPrimaryButton(
                        title: "Rembourser",
                        onPressed: () {
                          final noDebt =
                              (provider.debtState.data?.currentPackagesDebt ??
                                  0) ==
                              0;
                          if (provider.returnState.isLoading || noDebt) {
                            if (noDebt) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text(
                                    "Ce client n'a aucune dette d'emballage",
                                  ),
                                ),
                              );
                            }
                            return;
                          }
                          _showReturnDialog();
                        },
                        height: 50,
                        radius: 8,
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Colors.transparent,
                        border: Border.all(color: context.primaryColor),
                        textColor: context.titleLargeColor,
                        withDefaultLoader: true,
                        isLoading: provider.returnState.isLoading,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                // History
                SimpleText(
                  text: "Historique",
                  size: 18,
                  weight: FontWeight.bold,
                  color: context.titleLargeColor,
                ),
                const SizedBox(height: 12),
                if (provider.historyState.isLoading)
                  const Center(child: CircularProgressIndicator())
                else if (provider.historyState.hasError)
                  SimpleText(
                    text: "Erreur de chargement de l'historique",
                    color: context.titleLargeColor.withValues(alpha: 0.5),
                  )
                else if ((provider.historyState.data ?? []).isEmpty)
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: SimpleText(
                        text: "Aucune transaction d'emballage",
                        color: context.titleLargeColor.withValues(alpha: 0.5),
                      ),
                    ),
                  )
                else
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: provider.historyState.data!.length,
                    separatorBuilder: (ctx, idx) =>
                        Divider(color: context.tertiary, thickness: 2),
                    itemBuilder: (context, index) => PackageTransactionTile(
                      transaction: provider.historyState.data![index],
                    ),
                  ),
              ] else
                Center(
                  child: Padding(
                    padding: EdgeInsets.only(
                      top: SizeConfig.screenHeight * 0.1,
                    ),
                    child: Column(
                      children: [
                        Icon(
                          Icons.inventory_2_outlined,
                          size: 64,
                          color: context.titleLargeColor.withValues(alpha: 0.2),
                        ),
                        const SizedBox(height: 16),
                        SimpleText(
                          text:
                              "Sélectionnez un client pour gérer ses emballages",
                          color: context.titleLargeColor.withValues(alpha: 0.4),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
