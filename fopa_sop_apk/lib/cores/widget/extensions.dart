import 'package:flutter/material.dart';

extension ColorsExtensions on Color {
  Color withAppOppacity(double val) {
    assert(val <= 1 && val > 0, "La valeur est comprise entre 0 et 1");
    return withAlpha((val * 255).round());
  }

  ColorFilter iconColor() => ColorFilter.mode(this, BlendMode.srcIn);
}

extension TextExtensions on String {
  String get initials {
    return split(' ').map((e) => e[0].toUpperCase()).join();
  }
}

extension WidgetExtensions on Widget {
  Padding padding(EdgeInsetsGeometry padding) =>
      Padding(padding: padding, child: this);

  Widget ontap(VoidCallback? onTap) => InkWell(onTap: onTap, child: this);
}

