import 'dart:async';
import 'dart:developer';
import 'dart:io';
// import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/constantes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/bottom_sheet_container.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:image_picker/image_picker.dart';
import 'package:logger/logger.dart';

class Utils {
  static void showButtomSheet(BuildContext context, {required Widget widget}) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return widget;
      },
    );
  }

  // static void showLogoutDialog(BuildContext context) {
  //   return showButtomSheet(context, widget: LogoutDialog());
  // }

  static void printLog(dynamic object) {
    if (kDebugMode) {
      log(object.toString());
    }
  }

  static void printer(dynamic object) {
    if (kDebugMode) {
      print(object.toString());
    }
  }

  static void logger(dynamic object, {Level? level}) {
    if (kDebugMode) {
      var logger = Logger(level: level);
      logger.d(object.toString());
    }
  }

  static void loadDatas() {}

  static Future<File?> pickImage(
    BuildContext context, {
    int quality = 100,
  }) async {
    File? file;
    await showModalBottomSheet(
      context: context,
      builder: (context) {
        var svgPicture = SvgPicture.string(
          arrowForwardIconSvg,
          width: 35.w,
          height: 35.w,
          colorFilter: ColorFilter.mode(
            context.titleLargeColor,
            BlendMode.srcIn,
          ),
        );
        return BottomSheetContainer(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SimpleText(
                text: "Choisir la source de l'image",
                weight: FontWeight.w600,
                size: 20.w,
              ),
              spacerHeight(15),
              ListTile(
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 15.w,
                  vertical: 5,
                ),
                onTap: () async {
                  file = await pickImageFromSource(
                    ImageSource.gallery,
                    quality: quality,
                  );
                  if (context.mounted) {
                    Navigator.pop(context, file);
                  }
                },
                title: SimpleText(
                  text: "Galerie",
                  weight: FontWeight.w600,
                  size: 16.w,
                ),
                trailing: svgPicture,
                leading: leadingIcon(context, gallerieIconSvg),
              ),
              spacerHeight(5),
              Divider(color: context.tertiary),
              ListTile(
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 15.w,
                  vertical: 5,
                ),
                onTap: () async {
                  file = await pickImageFromSource(ImageSource.camera);
                  if (context.mounted) {
                    Navigator.pop(context, file);
                  }
                },
                title: SimpleText(
                  text: "Appareil photo",
                  weight: FontWeight.w600,
                  size: 16.w,
                ),
                trailing: svgPicture,
                leading: leadingIcon(context, cameraIconSvg),
              ),
              spacerHeight(20),
            ],
          ),
        );
      },
    );
    return file;
  }

  static Future<File?> pickImageFromSource(
    ImageSource source, {
    int quality = 100,
  }) async {
    final pickedFile = await ImagePicker().pickImage(
      source: source,
      imageQuality: quality,
    );
    if (pickedFile != null) {
      return File(pickedFile.path);
    }
    return null;
  }

  static String getCode() {
    final deviceLocale = PlatformDispatcher.instance.locale;
    // return Get.locale?.languageCode.toLowerCase() == "fr" ? "Fr_fr" : "En_Us";
    return deviceLocale.languageCode.toLowerCase() == "fr" ? "Fr_fr" : "En_Us";
  }

  static void showErrorSnackBar(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppThemes.redColors,
        duration: duration,
        content: Text(
          message,
          style: appTextStyle.copyWith(
            color: white,
            fontSize: 16.w,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  static void showSuccessSnackBar(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.green,
        duration: duration,
        content: Text(
          message,
          style: appTextStyle.copyWith(
            color: white,
            fontSize: 16.w,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  static void showInfoSnackBar(
    BuildContext context,
    String message, {
    Duration duration = const Duration(seconds: 3),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppThemes.primaryColor.withAppOppacity(0.6),
        duration: duration,
        content: Text(
          message,
          style: appTextStyle.copyWith(
            color: white,
            fontSize: 16.w,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  static Widget leadingIcon(BuildContext context, String icon, {Color? color}) {
    return CircleAvatar(
      backgroundColor: context.tertiary,
      radius: 30.w,
      child: Center(
        child: SvgPicture.string(
          icon,
          width: 35.w,
          height: 35.w,
          colorFilter: ColorFilter.mode(
            color ?? context.titleLargeColor,
            BlendMode.srcIn,
          ),
        ),
      ),
    );
  }

  static final RegExp _emailRegex = RegExp(
    r"^((([a-z]|\d|[!#\$%&'*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$",
  );

  static bool isValidEmail(String email) {
    return _emailRegex.hasMatch(email.trim());
  }
}
