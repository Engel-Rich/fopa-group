import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_list_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/widgets/stock_movement_component.dart';

class MovementsListWidget extends StatelessWidget {
  final StockMovementListModel? movementsData;
  final bool isLoading;
  final int currentPage;
  final int limit;
  final VoidCallback onPreviousPage;
  final VoidCallback onNextPage;

  const MovementsListWidget({
    super.key,
    required this.movementsData,
    required this.isLoading,
    required this.currentPage,
    required this.limit,
    required this.onPreviousPage,
    required this.onNextPage,
  });

  @override
  Widget build(BuildContext context) {
    if (isLoading && movementsData == null) {
      return Center(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (movementsData == null || movementsData!.movements.isEmpty) {
      return Center(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: SimpleText(
            text: "Aucun mouvement enregistré",
            color: context.titleLargeColor,
          ),
        ),
      );
    }

    final movements = movementsData!.movements;
    final total = movementsData!.total;
    final hasMore = (currentPage * limit) < total;

    return Column(
      children: [
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: EdgeInsets.zero,
          itemCount: movements.length,
          itemBuilder: (context, index) {
            return StockMovementComponent(movement: movements[index]);
          },
        ),
        if (hasMore || currentPage > 1) ...[
          spacerHeight(15),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (currentPage > 1)
                CustomAppPrimaryButton(
                  title: "Précédent",
                  onPressed: onPreviousPage,
                  height: 40,
                  radius: 8,
                  width: 120,
                ),
              if (currentPage > 1 && hasMore) spacerWidth(10),
              if (hasMore)
                CustomAppPrimaryButton(
                  title: "Suivant",
                  onPressed: onNextPage,
                  height: 40,
                  radius: 8,
                  width: 120,
                ),
            ],
          ),
        ],
      ],
    );
  }
}
