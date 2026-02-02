import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hexcolor/hexcolor.dart';

import 'package:pinput/pinput.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';

class TextFieldApp extends StatelessWidget {
  final String? hintText;
  final bool? obscureText;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final void Function(String)? onchange;
  final String? Function(String?)? validator;
  final double? radius;
  final int? maxLength;
  final InputDecoration? decoration;
  final List<TextInputFormatter>? inputFormaters;
  final bool enabled;
  final bool autofocus;
  final TextInputAction? textInputAction;
  final void Function(String?)? onSaved;
  final void Function()? onTap;
  final String? initialValue;
  final int? maxLines;
  final String? label;
  final TextStyle? style;
  // final double? height;
  final EdgeInsets? containsPadding;
  const TextFieldApp({
    super.key,

    this.hintText,
    this.prefixIcon,
    this.obscureText,
    this.suffixIcon,
    this.controller,
    this.onchange,
    this.validator,
    this.keyboardType,
    this.maxLength,
    this.radius,
    this.inputFormaters,
    this.decoration,
    // this.height,
    this.containsPadding,
    this.autofocus = false,
    this.enabled = true,
    this.textInputAction,
    this.onSaved,
    this.onTap,
    this.initialValue,
    this.maxLines,
    this.label,
    this.style,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      initialValue: initialValue,
      onTap: onTap,
      keyboardType: keyboardType,
      obscureText: obscureText ?? false,
      maxLength: maxLength,
      autofocus: autofocus,
      maxLines: maxLines,
      textInputAction: textInputAction,
      inputFormatters: inputFormaters ?? [],
      validator: validator,
      onChanged: onchange,
      onSaved: onSaved,

      style: style ?? appTextStyle.copyWith(fontSize: 16),
      cursorColor: AppThemes.primaryVariant,
      readOnly: !enabled,
      decoration:
          decoration ??
          InputDecoration(
            hintText: hintText,
            prefixIcon: prefixIcon,
            labelText: label,
            filled: true,
            fillColor: context.tertiary,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(radius ?? 30),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(radius ?? 30),
              // borderSide: BorderSide(width: 0.5),
              borderSide: BorderSide.none,
            ),
            contentPadding: containsPadding,
            hintStyle: appTextStyle.copyWith(color: HexColor('8e8e8e')),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(radius ?? 30),
              borderSide: BorderSide.none,
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(radius ?? 30),
              borderSide: const BorderSide(color: Colors.red, width: 0.5),
            ),
            suffixIcon: suffixIcon,
          ),
    );
  }
}

InputDecoration inputDecorationApp({
  final String? hintext,
  final Widget? sufixIcon,
  double? radius,
  required BuildContext context,
  EdgeInsets? containsPadding,
}) {
  return InputDecoration(
    hintText: hintext,
    filled: true,
    fillColor: context.tertiary,
    contentPadding: containsPadding,
    hintStyle: appTextStyle.copyWith(fontSize: 16),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius ?? 12),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius ?? 12),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius ?? 12),
      borderSide: BorderSide(color: AppThemes.primaryVariant, width: 0.5),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius ?? 12),
      borderSide: const BorderSide(color: Colors.red, width: 0.5),
    ),
    suffixIcon: sufixIcon,
  );
}

// class IntlPhoneFieldApp extends StatelessWidget {
//   final EdgeInsets? containsPadding;
//   final String? hintext;
//   final bool? obscureText;
//   final Widget? sufixIcon;
//   final TextEditingController? controller;
//   final TextInputType? keyboardType;
//   final void Function(PhoneNumber)? onchange;
//   final double? radius;
//   final FutureOr<String?> Function(PhoneNumber?)? validator;
//   // final List<Countries>? countries;
//   final void Function(Country)? onCountryChanged;
//   final InputDecoration? decoration;
//   final void Function(String)? onSubmitted;
//   final void Function(PhoneNumber?)? onSaved;
//   final bool enabled;
//   final String? initialCountryCode;
//   final List<Country>? countries;
//   const IntlPhoneFieldApp({
//     super.key,
//     this.hintext,
//     this.obscureText,
//     this.sufixIcon,
//     this.controller,
//     this.onchange,
//     this.validator,
//     this.radius,
//     this.keyboardType,
//     // this.countries,
//     this.onCountryChanged,
//     this.decoration,
//     this.containsPadding,
//     this.onSubmitted,
//     this.onSaved,
//     this.enabled = false,
//     this.initialCountryCode,
//     this.countries,
//   });

//   @override
//   Widget build(BuildContext context) {
//     return IntlPhoneField(
//       style: appTextStyle.copyWith(fontSize: 14),
//       initialCountryCode: initialCountryCode ?? "",
//       readOnly: enabled,
//       countries: countries,
//       pickerDialogStyle: PickerDialogStyle(
//         searchFieldInputDecoration: inputDecorationApp(
//           hintext: 'Search country',
//           context: context,
//         ),
//       ),
//       keyboardType: TextInputType.phone,
//       inputFormatters: [
//         FilteringTextInputFormatter.singleLineFormatter,
//         FilteringTextInputFormatter.digitsOnly,
//       ],
//       onCountryChanged: onCountryChanged,
//       validator: validator,
//       controller: controller,
//       onSubmitted: onSubmitted,
//       onSaved: onSaved,
//       decoration:
//           decoration ??
//           inputDecorationApp(hintext: '--- --- ---', context: context).copyWith(
//             contentPadding: containsPadding,
//             enabledBorder: OutlineInputBorder(
//               borderRadius: BorderRadius.circular(radius ?? 12),
//               borderSide: BorderSide(color: Colors.transparent),
//             ),
//             focusedBorder: OutlineInputBorder(
//               borderRadius: BorderRadius.circular(radius ?? 12),
//               borderSide: BorderSide(color: Colors.transparent),
//             ),
//             errorBorder: OutlineInputBorder(
//               borderRadius: BorderRadius.circular(radius ?? 12),
//               borderSide: const BorderSide(color: Colors.red),
//             ),
//           ),
//       onChanged: onchange,
//     );
//   }
// }

class OtpFieldApp extends StatelessWidget {
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final void Function(String)? onChanged;
  final double? radius;
  final String? Function(String?)? validator;
  final bool obscureText;
  final void Function(String)? onSubmitted;

  const OtpFieldApp({
    super.key,
    this.controller,
    this.onChanged,
    this.validator,
    this.radius,
    this.keyboardType,
    this.obscureText = false,
    this.onSubmitted,
  });

  @override
  Widget build(BuildContext context) {
    return Pinput(
      length: 6,
      controller: controller,
      obscureText: obscureText,
      validator: validator,
      onChanged: onChanged,
      onSubmitted: onSubmitted,
      errorPinTheme: pinThem(
        radius,
        context,
      ).copyBorderWith(border: Border.all(color: Colors.red)),
      defaultPinTheme: pinThem(radius, context),
      pinAnimationType: PinAnimationType.rotation,
    );
  }
}

PinTheme pinThem(double? radius, BuildContext context) => PinTheme(
  width: 50.h,
  height: 50.h,
  textStyle: appTextStyle.copyWith(
    color: context.primaryColor,
    fontWeight: FontWeight.bold,
    fontSize: 24,
  ),
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(radius ?? 10),
    color: context.tertiary,
    // border: Border.all(color: context.primaryblue),
  ),
);

InputDecoration decorationsInputs(
  String hintext, {
  Widget? suffixIcon,
  Widget? prefixIcon,
}) {
  return InputDecoration(
    suffixIcon: suffixIcon,
    prefixIcon: prefixIcon,
    hintText: hintext,
    hintStyle: appTextStyle.copyWith(
      fontSize: 13.w,
      fontWeight: FontWeight.w200,
    ),
    border: UnderlineInputBorder(
      borderSide: BorderSide(color: AppThemes.primaryVariant),
    ),
    enabledBorder: UnderlineInputBorder(
      borderSide: BorderSide(color: AppThemes.primaryVariant),
    ),
    focusedBorder: UnderlineInputBorder(
      borderSide: BorderSide(color: AppThemes.primaryVariant),
    ),
    errorBorder: const UnderlineInputBorder(
      borderSide: BorderSide(color: Colors.red),
    ),
    focusedErrorBorder: const UnderlineInputBorder(
      borderSide: BorderSide(color: Colors.red),
    ),
  );
}

class InputTitle extends StatelessWidget {
  final String title;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final TextStyle? titleStyle;
  final Color? color;
  const InputTitle({
    super.key,
    required this.title,
    this.suffixIcon,
    this.prefixIcon,
    this.titleStyle,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        if (prefixIcon != null) ...[prefixIcon!, spacerWidth(10)],
        Text(
          title,
          style:
              titleStyle ??
              appTextStyle.copyWith(
                fontSize: 16.w,
                fontWeight: FontWeight.w600,
                color: color ?? context.primaryColor,
              ),
        ),
        if (suffixIcon != null) ...[spacerWidth(10), suffixIcon!],
      ],
    );
  }
}
