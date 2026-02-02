import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/controllers/report_provider.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/widgets/daily_report_component.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/widgets/monthly_report_component.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/widgets/yearly_report_component.dart';
import 'package:get_it/get_it.dart';
import 'package:provider/provider.dart';

enum ReportPeriodicity { daily, monthly, yearly }

class ReportScreen extends StatefulWidget {
  const ReportScreen({super.key});

  @override
  State<ReportScreen> createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  ReportPeriodicity _selectedPeriodicity = ReportPeriodicity.daily;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadReport();
    });
  }

  Future<void> _loadReport() async {
    final reportProvider = GetIt.instance<ReportProvider>();
    final now = DateTime.now();

    switch (_selectedPeriodicity) {
      case ReportPeriodicity.daily:
        await reportProvider.getDailySales(page: 1, limit: 20);
        break;
      case ReportPeriodicity.monthly:
        await reportProvider.getMonthlySales(month: now.month, year: now.year);
        break;
      case ReportPeriodicity.yearly:
        await reportProvider.getYearlySales(year: now.year);
        break;
    }
  }

  void _onPeriodicityChanged(ReportPeriodicity value) {
    setState(() {
      _selectedPeriodicity = value;
    });
    _loadReport();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider.value(
      value: GetIt.instance<ReportProvider>(),
      child: Scaffold(
        appBar: AppBar(
          title: SimpleText(
            text: "Rapports de vente",
            color: context.titleLargeColor,
          ),
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.all(16.0),
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _PeriodicityDropdown(
                selectedPeriodicity: _selectedPeriodicity,
                onChanged: _onPeriodicityChanged,
              ),
              spacerHeight(24),
              Divider(color: context.tertiary),
              spacerHeight(15),
              SimpleText(
                text: _getPeriodicityTitle(),
                size: 20,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              spacerHeight(15),
              Consumer<ReportProvider>(
                builder: (context, reportProvider, child) {
                  if (_selectedPeriodicity == ReportPeriodicity.daily) {
                    if (reportProvider.getDailySalesState.isLoading &&
                        reportProvider.dailySalesList.isEmpty) {
                      return const ListSkeleton();
                    }
                    if (reportProvider.getDailySalesState.hasError) {
                      return _buildErrorState(
                        message:
                            reportProvider
                                .getDailySalesState
                                .errorModel
                                ?.error ??
                            "Erreur",
                        onRetry: _loadReport,
                      );
                    }
                    return _buildDailyList(reportProvider);
                  }
                  if (_selectedPeriodicity == ReportPeriodicity.monthly) {
                    if (reportProvider.getMonthlySalesState.isLoading &&
                        reportProvider.getMonthlySalesState.data == null) {
                      return const ListSkeleton();
                    }
                    if (reportProvider.getMonthlySalesState.hasError) {
                      return _buildErrorState(
                        message:
                            reportProvider
                                .getMonthlySalesState
                                .errorModel
                                ?.error ??
                            "Erreur",
                        onRetry: _loadReport,
                      );
                    }
                    return _buildMonthlyReport(reportProvider);
                  }
                  if (_selectedPeriodicity == ReportPeriodicity.yearly) {
                    if (reportProvider.getYearlySalesState.isLoading &&
                        reportProvider.getYearlySalesState.data == null) {
                      return const ListSkeleton();
                    }
                    if (reportProvider.getYearlySalesState.hasError) {
                      return _buildErrorState(
                        message:
                            reportProvider
                                .getYearlySalesState
                                .errorModel
                                ?.error ??
                            "Erreur",
                        onRetry: _loadReport,
                      );
                    }
                    return _buildYearlyReport(reportProvider);
                  }
                  return const SizedBox.shrink();
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildErrorState({
    required String message,
    required VoidCallback onRetry,
  }) {
    return Container(
      padding: EdgeInsets.all(40),
      child: Column(
        children: [
          SimpleText(
            text: message,
            size: 16,
            color: context.titleLargeColor.withAppOppacity(0.7),
            textAlign: TextAlign.center,
          ),
          spacerHeight(20),
          CustomAppPrimaryButton(
            title: "Actualiser",
            onPressed: onRetry,
            width: SizeConfig.screenWidth * 0.5,
            height: 45,
            radius: 8,
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ],
      ),
    );
  }

  Widget _buildDailyList(ReportProvider reportProvider) {
    final list = reportProvider.dailySalesList;
    if (list.isEmpty) {
      return Padding(
        padding: EdgeInsets.all(40),
        child: SimpleText(
          text: "Aucun rapport quotidien",
          size: 16,
          color: context.titleLargeColor.withAppOppacity(0.7),
          textAlign: TextAlign.center,
        ),
      );
    }
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: EdgeInsets.zero,
      itemCount: list.length,
      itemBuilder: (context, index) {
        return DailyReportComponent(dailySales: list[index]);
      },
    );
  }

  Widget _buildMonthlyReport(ReportProvider reportProvider) {
    final data = reportProvider.getMonthlySalesState.data;
    if (data == null) {
      return Padding(
        padding: EdgeInsets.all(40),
        child: SimpleText(
          text: "Aucun rapport mensuel",
          size: 16,
          color: context.titleLargeColor.withAppOppacity(0.7),
          textAlign: TextAlign.center,
        ),
      );
    }
    return MonthlyReportComponent(monthlySales: data);
  }

  Widget _buildYearlyReport(ReportProvider reportProvider) {
    final data = reportProvider.getYearlySalesState.data;
    if (data == null) {
      return Padding(
        padding: EdgeInsets.all(40),
        child: SimpleText(
          text: "Aucun rapport annuel",
          size: 16,
          color: context.titleLargeColor.withAppOppacity(0.7),
          textAlign: TextAlign.center,
        ),
      );
    }
    return YearlyReportComponent(yearlySales: data);
  }

  String _getPeriodicityTitle() {
    switch (_selectedPeriodicity) {
      case ReportPeriodicity.daily:
        return "Rapports quotidiens";
      case ReportPeriodicity.monthly:
        return "Rapports mensuels";
      case ReportPeriodicity.yearly:
        return "Rapports annuels";
    }
  }
}

class _PeriodicityDropdown extends StatelessWidget {
  final ReportPeriodicity selectedPeriodicity;
  final ValueChanged<ReportPeriodicity> onChanged;

  const _PeriodicityDropdown({
    required this.selectedPeriodicity,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SimpleText(
          text: "Périodicité",
          size: 14,
          color: context.titleLargeColor,
        ),
        spacerHeight(8),
        DropdownButtonFormField<ReportPeriodicity>(
          value: selectedPeriodicity,
          decoration: inputDecorationApp(
            context: context,
            hintext: "Sélectionnez la périodicité",
            radius: 8,
          ),
          items: ReportPeriodicity.values
              .map(
                (periodicity) => DropdownMenuItem<ReportPeriodicity>(
                  value: periodicity,
                  child: SimpleText(text: _getPeriodicityLabel(periodicity)),
                ),
              )
              .toList(),
          onChanged: (value) {
            if (value != null) {
              onChanged(value);
            }
          },
        ),
      ],
    );
  }

  String _getPeriodicityLabel(ReportPeriodicity periodicity) {
    switch (periodicity) {
      case ReportPeriodicity.daily:
        return "Quotidien";
      case ReportPeriodicity.monthly:
        return "Mensuel";
      case ReportPeriodicity.yearly:
        return "Annuel";
    }
  }
}
