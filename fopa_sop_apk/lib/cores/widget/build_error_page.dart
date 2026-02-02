import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';

// import 'package:relax/utils/utils.dart';

class BuildErrorScreen extends StatelessWidget {
  final String? errorMassage;
  final String? buttonMassage;
  final String? asset;
  final String? title;
  final VoidCallback? onbackButton;
  final bool showButton;
  final Widget? child;
  final double? height, width;
  final bool hasImage;
  const BuildErrorScreen({
    super.key,
    this.errorMassage,
    this.onbackButton,
    this.buttonMassage,
    this.asset,
    this.title,
    this.showButton = true,
    this.child,
    this.height,
    this.width,
    this.hasImage = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (hasImage)
          Image.asset(
            asset ?? "assets/images/emptyOrder.png",
            height: height ?? 100.w,
            width: width ?? 100.w,
          ),
        spacerHeight(15),
        SimpleText(
          text: title ?? 'An error has occurred',
          size: 16.w,
          textAlign: TextAlign.center,
          color: context.titleLargeColor,
          weight: FontWeight.w400,
        ),
        spacerHeight(10),
        SimpleText(
          text: errorMassage ?? "Unknown server error",
          overflow: TextOverflow.ellipsis,
          textAlign: TextAlign.center,
        ),
        spacerHeight(20),
        if (showButton)
          CustomAppPrimaryButton(
            onPressed: onbackButton ?? () {},
            title: buttonMassage ?? "Retry",
            radius: 12,
          ),
        if (child != null) child!,
        spacerHeight(20),
      ],
    );
  }
}
