// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:async';
import 'dart:io';

import 'package:dio/dio.dart';

import 'package:flutter/services.dart';

import 'package:fopa_sop_apk/cores/error_hanlder/error_model.dart';
import 'package:fopa_sop_apk/cores/utils.dart';

ErrorModel returnError(dynamic error) {
  if (error is CustomException) {
    return ErrorModel(error: error.message);
  }
  if (error is ErrorModel) {
    return error;
  }
  // error.printInfo();
  switch (error.runtimeType) {
    case const (SocketException):
      // printer('socket exception');
      return ErrorModel.fromMap({"error": 'Erreur de connection internet'});
    case const (TimeoutException):
      // printer('socket exception');
      return ErrorModel.fromMap({
        "error": 'Delet d\'attente dépaasé veillez réssayer',
      });
    case const (PlatformException):
      Utils.printer(error);
      return ErrorModel.fromMap({"error": 'Erreur systeme inconnue'});

    case const (DioException):
      // printer('error dio');
      return manageDioError(error as DioException);
    case const (CustomException):
      // printer('error dio');
      return ErrorModel.fromMap({'error': (error as CustomException).message});
    default:
      // printer('cant\'t get error type ${error.runtimeType}');
      return ErrorModel.fromMap({'error': error.toString()});
  }
}

// Gestion des erreur web service du packages Dio

ErrorModel manageDioError(DioException except) {
  final code = except.response?.statusCode;
  if (except.error is CustomException) {
    return ErrorModel(error: (except.error as CustomException).message);
  }
  if (except.error is SocketException) {
    return ErrorModel(error: (except.error as SocketException).message);
  }

  switch (code) {
    case 400:
      if (except.response?.data['error_message'] != null) {
        return ErrorModel.fromMap({
          'error': except.response?.data['error_message'],
        });
      }
      return ErrorModel.fromMap({
        "error":
            'Impossible de traiter votre demande veuillez réessayer plus tard',
      });
    case 401:
      return ErrorModel.fromMap({"error": 'Erreur d\'hauthentification'});
    case 403:
      return ErrorModel.fromMap({
        "error":
            except.response?.statusMessage ??
            'Vous n\'avez pas les permissions requises',
      });
    case 413:
      return ErrorModel.fromMap({
        "error": "La taille de la requête est trop grande",
      });
    case 500:
      return ErrorModel.fromMap({
        "error":
            except.message ??
            except.response?.data ??
            except.response?.statusMessage ??
            'Erreur de serveur interne',
      });
    case 404:
      return ErrorModel.fromMap({'error': 'Connection au serveur impossible'});
    default:
      switch (except.type) {
        case DioExceptionType.receiveTimeout:
          return ErrorModel.fromMap({'error': 'Temps de réponse dépassé'});
        case DioExceptionType.sendTimeout:
          return ErrorModel.fromMap({'error': 'Temps de réponse dépassé'});
        case DioExceptionType.connectionTimeout:
          return ErrorModel.fromMap({
            'error':
                except.response?.data['error'] ??
                "Connection au serveur impossible",
          });
        case DioExceptionType.cancel:
          return ErrorModel.fromMap({'error': 'Requête annulée'});
        case DioExceptionType.badCertificate:
          return ErrorModel.fromMap({
            'error':
                except.response?.data['error'] ?? "Certificat SSL invalide",
          });
        case DioExceptionType.badResponse:
          return ErrorModel.fromMap({
            'error':
                except.response?.data['error'] ??
                "Quelque chose n'a pas fonctionné",
          });
        default:
          return ErrorModel.fromMap({
            'error':
                except.response?.data['error'] ??
                "Quelque chose n'a pas fonctionné",
          });
      }
  }
}

// Gestion des erreur inconnues .

ErrorModel returnCatchError(error) {
  switch (error.runtimeType) {
    case const (SocketException):
      Utils.printer('error SOCKET $error');
      return ErrorModel.fromMap({"error": 'Erreur de connection internet'});

    case const (HttpException):
      Utils.printer('error HTTP');
      return ErrorModel.fromMap({"error": 'Erreur de connection internet'});
    default:
      // printer('cant\'t get error type');
      return ErrorModel.fromMap({'error': "Quelque chose n'a pas fonctionné"});
  }
}

class CustomException implements Exception {
  final String message;
  final int? code;
  CustomException({required this.message, this.code});
}
