import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';

Color black = AppThemes.darkBackground;
Color blackColor = Colors.black;
Color white = AppThemes.offWhiteColor;
Color white54 = HexColor("E1E0E4");
Color primaryColors = AppThemes.primaryColor;
Color redColors = AppThemes.redColors;

Color transactionImageColor = HexColor("FCE196");
Color textColor = HexColor('656565');

final TextStyle appTextStyle = TextStyle(fontFamily: "Roboto", fontSize: 15);
const double bodyHorizontalPading = 15.0;

class AppThemes {
  // 🎨 Palette principale
  static final Color primaryColor = HexColor("33a4da");
  // Violet profond (Primary)
  static final Color primaryVariant = HexColor("42c7c5");
  static final Color secondaryColor = primaryVariant;
  static final Color tertiaryColor = HexColor("EFEFEF");
  static final Color whiteColor = HexColor("FFFFFF");
  static final Color offWhiteColor = HexColor("FAFAFA");
  static final Color lightGray = HexColor("F5F5F5");
  static final Color darkGray = HexColor("2C2C2C");
  static final Color redColors = HexColor("D32F2F");
  static final Color darkBackground = HexColor("1e232c");
  static final Color tertiaryDarkColor = HexColor("1e232c");

  // 🌞 Thème clair
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    primaryColor: primaryColor,
    scaffoldBackgroundColor: offWhiteColor,
    appBarTheme: AppBarTheme(
      backgroundColor: offWhiteColor,
      foregroundColor: darkBackground,
      surfaceTintColor: offWhiteColor,
      elevation: 0,
    ),
    textTheme: TextTheme(
      bodyLarge: TextStyle(color: black, fontFamily: "Poppins"),
      bodyMedium: TextStyle(color: black, fontFamily: "Poppins"),
      titleMedium: TextStyle(color: black, fontFamily: "Poppins"),
      titleSmall: TextStyle(color: black, fontFamily: "Poppins"),
      labelLarge: TextStyle(color: black, fontFamily: "Poppins"),
      labelMedium: TextStyle(color: black, fontFamily: "Poppins"),
      labelSmall: TextStyle(color: black, fontFamily: "Poppins"),
      bodySmall: TextStyle(color: black, fontFamily: "Poppins"),
      // titleLarge: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: primaryColor,
      foregroundColor: whiteColor,
    ),
    colorScheme: ColorScheme.light(
      primary: primaryColor,
      secondary: secondaryColor,
      surface: lightGray,
      onSurface: darkGray,
      tertiary: tertiaryColor,
      error: redColors,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: whiteColor,
        textStyle: const TextStyle(fontWeight: FontWeight.bold),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    ),
  );

  // 🌚 Thème sombre
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    primaryColor: primaryColor,
    scaffoldBackgroundColor: darkBackground,
    appBarTheme: AppBarTheme(
      backgroundColor: darkBackground,
      surfaceTintColor: darkBackground,
      foregroundColor: offWhiteColor,
      elevation: 0,
    ),
    textTheme: TextTheme(
      bodyLarge: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      bodyMedium: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      titleLarge: TextStyle(color: secondaryColor, fontWeight: FontWeight.bold),
      titleMedium: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      titleSmall: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      labelLarge: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      labelMedium: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      labelSmall: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
      bodySmall: TextStyle(color: offWhiteColor, fontFamily: "Poppins"),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: primaryColor,
      foregroundColor: whiteColor,
    ),
    colorScheme: ColorScheme.dark(
      primary: primaryColor,
      secondary: secondaryColor,
      surface: darkGray,
      onSurface: offWhiteColor,
      tertiary: tertiaryDarkColor,
      error: redColors,
      onTertiary: white,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: whiteColor,
        textStyle: const TextStyle(fontWeight: FontWeight.bold),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    ),
  );
}

extension ColorExtentionn on BuildContext {
  Color get tertiary => Theme.of(this).colorScheme.tertiary;
  Color get scaffoldBackgroundColor => Theme.of(this).scaffoldBackgroundColor;
  Color get titleLargeColor => Theme.of(this).textTheme.titleLarge!.color!;
  Color get primaryColor => Theme.of(this).primaryColor;
  Color get secondaryColor => Theme.of(this).colorScheme.secondary;
}
