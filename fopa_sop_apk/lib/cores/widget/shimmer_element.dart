import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:shimmer/shimmer.dart';

class ShimmerElement extends StatelessWidget {
  final Widget child;
  final Color? baseColor;
  final Color? highlightColor;
  const ShimmerElement({
    super.key,
    required this.child,
    this.baseColor,
    this.highlightColor,
  });

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      period: const Duration(milliseconds: 2000),
      baseColor: baseColor ?? Colors.grey.shade300,
      highlightColor: context.tertiary,
      child: child,
    );
  }
}
