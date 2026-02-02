import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/widget/app_loaders.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';

// import 'package:mobile_bankin_app/utils/shared/app_loaders.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';

class CustomAppPrimaryButton extends StatelessWidget {
  final double? height;
  final double? width;
  final VoidCallback onPressed;
  final Widget? child;
  final String? title;
  final double? radius;
  final Color? color;
  final Color? disableColors;
  final BoxBorder? border;
  final bool disabled;
  final double? fontSize;
  final Color? textColor;
  final bool withDefaultLoader;
  final bool isLoading;
  final Color? loaderColor;
  final FontWeight? fontWeight;
  const CustomAppPrimaryButton({
    super.key,
    required this.onPressed,
    this.height,
    this.title,
    this.radius,
    this.border,
    this.color,
    this.child,
    this.disableColors,
    this.disabled = false,
    this.fontSize,
    this.textColor = Colors.white,
    this.width,
    this.withDefaultLoader = false,
    this.isLoading = false,
    this.loaderColor,
    this.fontWeight,
  }) : assert(child == null || title == null, "");

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: width ?? double.infinity,
        height: height ?? 55.h,
        decoration: BoxDecoration(
          color: disabled
              ? disableColors ?? context.primaryColor.withAppOppacity(0.5)
              : color ?? context.primaryColor,
          borderRadius: BorderRadius.circular(radius ?? 30.h),
          border: border,
        ),
        child: withDefaultLoader
            ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title!,
                    textAlign: TextAlign.center,
                    style: appTextStyle.copyWith(
                      fontSize: fontSize ?? 17.w,
                      color: textColor,
                      fontWeight: fontWeight ?? FontWeight.w500,
                    ),
                  ),
                  spacerWidth(15),
                  if (isLoading)
                    AppLoader(size: 30.w, color: loaderColor ?? white)
                  else
                    const SizedBox.shrink(),
                ],
              )
            : (child ??
                  Center(
                    child: Text(
                      title!,
                      textAlign: TextAlign.center,
                      style: appTextStyle.copyWith(
                        fontSize: fontSize ?? 17.w,
                        color: textColor,
                        fontWeight: fontWeight ?? FontWeight.w500,
                      ),
                    ),
                  )),
      ),
    );
  }
}

class RefreshButton extends StatelessWidget {
  final VoidCallback onPressed;
  const RefreshButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          style: IconButton.styleFrom(
            padding: EdgeInsets.all(15.w),
            backgroundColor: context.tertiary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          onPressed: onPressed,
          icon: Icon(Icons.refresh, color: context.titleLargeColor),
        ),
        spacerHeight(15),
        SimpleText(
          text: "Réessayer",
          size: 16.w,
          weight: FontWeight.w600,
          color: context.titleLargeColor,
        ),
      ],
    );
  }
}

class BackRowButton extends StatelessWidget {
  const BackRowButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.arrow_back, color: context.primaryColor),
            spacerWidth(8),
            SimpleText(
              text: 'Retour',
              color: context.primaryColor,
              size: 16.w,
              weight: FontWeight.w600,
            ),
          ],
        )
        .ontap(() {
          context.pop();
        })
        .padding(EdgeInsets.all(10.w));
  }
}
