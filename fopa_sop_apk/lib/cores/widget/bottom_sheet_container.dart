import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';

class BottomSheetContainer extends StatelessWidget {
  final Widget child;
  final bool? showCenterbar;
  const BottomSheetContainer({
    super.key,
    required this.child,
    this.showCenterbar = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.only(top: 12, right: 20, left: 20, bottom: 20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        color: Theme.of(context).scaffoldBackgroundColor,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showCenterbar!) ...[
            Center(
              child: Container(
                width: 75.w,
                height: 12.w,
                decoration: BoxDecoration(
                  color: context.tertiary,
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
            ),
            spacerHeight(15),
          ],
          child,
        ],
      ),
    );
  }
}
