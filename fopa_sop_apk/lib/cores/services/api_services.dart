import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:logger/logger.dart';
import 'package:fopa_sop_apk/cores/constantes.dart';
import 'package:fopa_sop_apk/cores/error_hanlder/error_handler.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/cores/utils.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/services/auth_service.dart';

class InterceptorsWrapper extends Interceptor {
  final Dio dio;
  InterceptorsWrapper(this.dio);

  @override
  onResponse(response, handler) {
    return handler.next(response);
  }

  @override
  Future<void> onRequest(options, handler) async {
    // Utils.printer(options.data);
    Utils.printer(options.uri);
    final Map<String, dynamic> header = await getHeader();
    if (!options.headers.containsKey('registrations')) {
      options.headers.addAll(header);
    }

    return handler.next(options);
  }

  @override
  onError(DioException err, ErrorInterceptorHandler handler) async {
    Utils.logger(
      "Error ${err.message ?? err.response?.data ?? err.toString()},\n URI: ${err.requestOptions.uri}, Code: ${err.response?.statusCode}",
      level: Level.error,
    );

    if (err.response?.statusCode == 400 || err.response?.statusCode == 500) {
      return handler.reject(
        DioException(
          requestOptions: err.requestOptions,
          response: err.response,
          error: CustomException(
            message:
                getBadRequestErrorMessage(err.response) ??
                "Vous n'êtes pas autorisé à accéder à cette ressource",
            code: 400,
          ),
        ),
      );
    }
    if (err.response?.statusCode == 401) {
      if (err.requestOptions.headers.containsKey("Authorization")) {
        final token = await refreshToken();
        err.requestOptions.headers["Authorization"] = "Bearer $token";
        final response = await dio.fetch(err.requestOptions);
        return handler.resolve(response);
      } else {
        return handler.reject(
          DioException(
            requestOptions: err.requestOptions,
            response: err.response,
            error: CustomException(
              message:
                  getAuthErrorMessage(err.response) ??
                  "Vous n'êtes pas autorisé à accéder à cette ressource",
              code: 401,
            ),
            type: DioExceptionType.badResponse,
          ),
        );
      }
    }
    return handler.next(err);
  }

  static Future<Map<String, dynamic>> getHeader() async {
    final data = {
      'Content-Type': 'application/json',
      "Accept": "Application/json",
    };
    try {
      final token = GetIt.instance<LocalStorageService>().getUserToken()?.token;
      Utils.printLog('Header Token $token');
      if (token != null) {
        data['Authorization'] = 'Bearer $token';
      }
    } catch (e) {
      Utils.printLog(e);
    }
    return data;
  }
}

Future<String?> refreshToken() async {
  try {
    final token = GetIt.instance<LocalStorageService>().getUserToken();
    if (token?.refreshToken != null) {
      final access = await GetIt.instance<AuthService>().refreshToken(
        token!.refreshToken,
      );
      token.token = access;
      GetIt.instance<LocalStorageService>().storeUserToken(token);
      return access;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// class UnauthorizedException extends DioException {
//   String? errorMessage;
//   UnauthorizedException(RequestOptions r, Response<dynamic>? response)
//     : super(requestOptions: r, response: response) {
//     errorMessage = getErrorMessage(response);
//   }
// }

String? getAuthErrorMessage(Response<dynamic>? response) {
  final reponse = response?.data;
  String? finalreponse;
  if (reponse is Map) {
    final detail = (reponse as Map<String, dynamic>)['detail'];
    final messages = reponse['messages'];
    final error = reponse['error'];
    if (detail is String) {
      finalreponse = detail;
    } else {
      if (messages is List<Map<String, dynamic>>) {
        finalreponse = messages.map((e) => e['message']).join(', ');
      }
      if (error is String) {
        finalreponse = error;
      }
    }
  }

  return finalreponse ?? "Vous n'êtes pas autorisé à accéder à cette ressource";
}

String? getBadRequestErrorMessage(Response<dynamic>? response) {
  final reponse = response?.data;
  String? finalreponse;
  if (reponse is Map) {
    final detail = (reponse as Map<String, dynamic>)['detail'];
    Utils.printLog('Reponse $reponse');
    final messages = reponse['messages'];
    Utils.printLog('Messages $messages');
    final values = (reponse as Map).values;
    if (detail is String) {
      Utils.printLog('Detail $detail');
      finalreponse = detail;
    } else if (messages is List<Map<String, dynamic>>) {
      Utils.printLog('Messages $messages');
      finalreponse = messages.map((e) => e['message']).join(', ');
    }
    Utils.printLog('Values $values');
    Utils.printLog('Final Response $finalreponse');

    if (finalreponse == null && values.isNotEmpty) {
      if (values.first is String) {
        finalreponse = values.first as String;
      } else if (values.first is List) {
        finalreponse = (values.first as List)[0].toString();
      }
    }
  }
  return finalreponse ?? "Les données envoyées sont incorrectes";
}

class API {
  final Dio dios = Dio(
    BaseOptions(
      baseUrl: baseUrl, // URL de base
      sendTimeout: const Duration(seconds: 90),
      connectTimeout: const Duration(seconds: 90),
      receiveTimeout: const Duration(seconds: 90),
    ),
  );
  Dio get dio => dios;
  API() {
    dios.interceptors.addAll({InterceptorsWrapper(dios)});
  }
}

// class BadRequestException extends DioException {
//   BadRequestException(RequestOptions r, Response<dynamic>? response)
//     : super(requestOptions: r, response: response) {
//     final reponse = response?.data;
//   }
// }
