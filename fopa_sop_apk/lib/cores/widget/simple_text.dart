import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';

class SimpleText extends StatelessWidget {
  final String text;

  final double? size;
  final Color? color;
  final FontWeight? weight;
  final StrutStyle? strutStyle;
  final TextAlign? textAlign;
  final TextDirection? textDirection;
  final Locale? locale;
  final bool? softWrap;
  final TextOverflow? overflow;
  final TextScaler? textScaler;
  final int? maxLines;
  final String? semanticsLabel;
  final TextWidthBasis? textWidthBasis;
  final TextHeightBehavior? textHeightBehavior;
  final Color? selectionColor;
  final double? lineHeight;
  final FontStyle? fontStyle;
  final double? letterSpacing;

  const SimpleText({
    super.key,
    required this.text,
    this.size,
    this.strutStyle,
    this.textAlign,
    this.textDirection,
    this.locale,
    this.softWrap,
    this.overflow,
    this.textScaler,
    this.maxLines,
    this.semanticsLabel,
    this.textWidthBasis,
    this.textHeightBehavior,
    this.selectionColor,
    this.color,
    this.weight,
    this.lineHeight,
    this.fontStyle,
    this.letterSpacing,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      overflow: overflow,
      softWrap: softWrap,
      locale: locale,
      textHeightBehavior: textHeightBehavior,
      textScaler: textScaler,
      textWidthBasis: textWidthBasis,
      strutStyle: strutStyle,
      semanticsLabel: semanticsLabel,
      maxLines: maxLines,
      selectionColor: selectionColor,
      textAlign: textAlign,
      textDirection: textDirection,
      style: appTextStyle.copyWith(
        letterSpacing: letterSpacing,
        fontSize: size ?? 15,
        fontWeight: weight,
        color: color,
        height: lineHeight,
        fontStyle: fontStyle,
      ),
    );
  }
}
