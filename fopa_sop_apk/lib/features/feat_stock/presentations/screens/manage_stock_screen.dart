import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_entry_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/dtos/create_stock_exit_dto.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_type.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/controllers/stock_provider.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/widgets/movement_form_widget.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/widgets/movements_list_widget.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/widgets/product_info_widget.dart';
import 'package:provider/provider.dart';

class ManageStockScreen extends StatefulWidget {
  final ProductResponseModel product;
  const ManageStockScreen({super.key, required this.product});

  @override
  State<ManageStockScreen> createState() => _ManageStockScreenState();
}

class _ManageStockScreenState extends State<ManageStockScreen> {
  int _currentPage = 1;
  final int _limit = 100;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadMovements();
    });
  }

  void _loadMovements() {
    final stockProvider = context.read<StockProvider>();
    stockProvider.getProductMovements(
      productId: widget.product.id,
      page: _currentPage,
      limit: _limit,
    );
  }

  void _handlePreviousPage() {
    if (_currentPage > 1) {
      setState(() {
        _currentPage--;
      });
      _loadMovements();
    }
  }

  void _handleNextPage() {
    final stockProvider = context.read<StockProvider>();
    final movementsData = stockProvider.listStockMovementsState.data;
    if (movementsData != null) {
      final hasMore = (_currentPage * _limit) < movementsData.total;
      if (hasMore) {
        setState(() {
          _currentPage++;
        });
        _loadMovements();
      }
    }
  }

  void _handleMovementSubmit({
    required StockMovementType type,
    required int quantity,
    double? unitPrice,
    String? reason,
  }) async {
    final stockProvider = context.read<StockProvider>();

    if (type == StockMovementType.ENTREE) {
      if (unitPrice == null) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Veuillez entrer un prix unitaire valide"),
            ),
          );
        }
        return;
      }
      await stockProvider.createStockEntry(
        CreateStockEntryDto(
          productId: widget.product.id,
          quantity: quantity,
          unitPrice: unitPrice,
        ),
      );

      if (stockProvider.createStockEntryState.hasError) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                stockProvider.createStockEntryState.errorModel?.error ??
                    "Erreur lors de l'enregistrement de l'entrée",
              ),
            ),
          );
        }
      } else if (stockProvider.createStockEntryState.hasNotNullData) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Entrée de stock enregistrée avec succès"),
            ),
          );
        }
        _loadMovements();
      }
    } else {
      if (reason == null || reason.isEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Veuillez entrer une raison")),
          );
        }
        return;
      }
      await stockProvider.createStockExit(
        CreateStockExitDto(
          productId: widget.product.id,
          quantity: quantity,
          reason: reason,
        ),
      );

      if (stockProvider.createStockExitState.hasError) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                stockProvider.createStockExitState.errorModel?.error ??
                    "Erreur lors de l'enregistrement de la sortie",
              ),
            ),
          );
        }
      } else if (stockProvider.createStockExitState.hasNotNullData) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Sortie de stock enregistrée avec succès"),
            ),
          );
        }
        _loadMovements();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: "Gestion du stock - ${widget.product.name}",
          color: context.titleLargeColor,
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          _loadMovements();
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: EdgeInsets.all(16.0),
          child: Consumer<StockProvider>(
            builder: (context, stockProvider, child) {
              final isLoading =
                  stockProvider.createStockEntryState.isLoading ||
                  stockProvider.createStockExitState.isLoading ||
                  stockProvider.listStockMovementsState.isLoading;
              final movementsData = stockProvider.listStockMovementsState.data;

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ProductInfoWidget(product: widget.product),
                  spacerHeight(24),
                  MovementFormWidget(
                    product: widget.product,
                    onSubmitted:
                        ({
                          required StockMovementType type,
                          required int quantity,
                          double? unitPrice,
                          String? reason,
                        }) {
                          _handleMovementSubmit(
                            type: type,
                            quantity: quantity,
                            unitPrice: unitPrice,
                            reason: reason,
                          );
                        },
                    isLoading: isLoading,
                  ),
                  spacerHeight(24),
                  Divider(color: context.tertiary),
                  spacerHeight(15),
                  SimpleText(
                    text: "Historique des mouvements",
                    size: 20,
                    weight: FontWeight.bold,
                    color: context.titleLargeColor,
                  ),
                  spacerHeight(15),
                  MovementsListWidget(
                    movementsData: movementsData,
                    isLoading: stockProvider.listStockMovementsState.isLoading,
                    currentPage: _currentPage,
                    limit: _limit,
                    onPreviousPage: _handlePreviousPage,
                    onNextPage: _handleNextPage,
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
