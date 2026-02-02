import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';

// const String baseUrl = "http://localhost:8085"; //"https://10.0.2.2:8085";
const String baseUrl = "http://192.168.43.184:8085"; //"https://10.0.2.2:8085";

String errorUnknown = "Une erreur inconnue est survenue";

// Il dois avoir un nouveau compte en tant que marchant

final border = OutlineInputBorder(
  borderSide: BorderSide(color: primaryColors),
  borderRadius: BorderRadius.circular(12.w),
);

final notificationIconsSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5" stroke-width="0.1" stroke="currentColor"/></g></svg>';
final settingsIconsSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"><path d="M13 2v4l-2 1l-3-3l-4 4l3 3l-1 2H2v6h4l1 2l-3 3l4 4l3-3l2 1v4h6v-4l2-1l3 3l4-4l-3-3l1-2h4v-6h-4l-1-2l3-3l-4-4l-3 3l-2-1V2Z"/><circle cx="16" cy="16" r="4"/></g></svg>';
const String gallerieIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"><path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5"/><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3"/></g></svg>';
const String cameraIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.5q1.875 0 3.188-1.312T16.5 13t-1.312-3.187T12 8.5T8.813 9.813T7.5 13t1.313 3.188T12 17.5m0-2q-1.05 0-1.775-.725T9.5 13t.725-1.775T12 10.5t1.775.725T14.5 13t-.725 1.775T12 15.5M4 21q-.825 0-1.412-.587T2 19V7q0-.825.588-1.412T4 5h3.15L8.4 3.65q.275-.3.663-.475T9.875 3h4.25q.425 0 .813.175t.662.475L16.85 5H20q.825 0 1.413.588T22 7v12q0 .825-.587 1.413T20 21zm0-2h16V7h-4.05l-1.825-2h-4.25L8.05 7H4zm8-6" stroke-width="0.1" stroke="currentColor"/></svg>';
const String arrowForwardIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414" stroke-width="0.1" stroke="currentColor"/></svg>';
const String signOutIconSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z" stroke-width="0.1" stroke="currentColor"/></svg>';
const String appIconSvg =
    '<svg width="63" height="68" viewBox="0 0 63 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.32 7.62939e-06V0.0960064C47.04 0.0960064 62.784 4.70401 62.784 26.304C62.784 47.808 47.04 52.512 28.32 52.512H22.272V67.2H3.44515e-05V7.62939e-06H28.32ZM32.832 33.696V33.6C39.072 33.6 40.896 29.376 40.896 26.304C40.896 23.136 39.072 18.912 32.832 18.912H22.272V33.696H32.832Z" fill="#001845"/></svg>';
