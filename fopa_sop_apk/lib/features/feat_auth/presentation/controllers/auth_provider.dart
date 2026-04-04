import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/cores/utils.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/dtos/login_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/dtos/register_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/auth_response_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_token.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/login_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/register_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/refresh_token_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/get_current_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/logout_usecase.dart';
import 'package:go_router/go_router.dart';

class AuthProvider extends ChangeNotifier {
  final LoginUseCase loginUseCase;
  final RegisterUserUseCase registerUserUseCase;
  final RefreshTokenUseCase refreshTokenUseCase;
  final GetCurrentUserUseCase getCurrentUserUseCase;
  final LogoutUseCase logoutUseCase;
  final LocalStorageService localStorageService;

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  UserModel? currentUser;
  AppState<AuthResponseModel> loginState = AppState();
  AppState<AuthResponseModel> registerState = AppState();
  AppState<String> refreshTokenState = AppState();

  AuthProvider({
    required this.loginUseCase,
    required this.registerUserUseCase,
    required this.refreshTokenUseCase,
    required this.getCurrentUserUseCase,
    required this.logoutUseCase,
    required this.localStorageService,
  }) {
    _loadUserFromStorage();
  }

  void _loadUserFromStorage() {
    final user = localStorageService.getUser();
    if (user != null) {
      currentUser = user;
      notifyListeners();
    }
  }

  Future<void> login(BuildContext context) async {
    final loginDto = LoginDto(
      username: emailController.text,
      password: passwordController.text,
    );
    loginState = AppState.loading();
    notifyListeners();
    loginState = await loginUseCase.call(loginDto);
    notifyListeners();
  }

  Future<void> register(RegisterUserDto registerDto) async {
    registerState = AppState.loading();
    notifyListeners();

    registerState = await registerUserUseCase.call(registerDto);

    if (registerState.hasError) {
      notifyListeners();
      return;
    }

    if (registerState.hasNotNullData) {
      final authResponse = registerState.data!;
      // Stocker le token
      await localStorageService.storeUserToken(authResponse.toUserToken());
      // Stocker l'utilisateur
      await localStorageService.storeUser(authResponse.user);
      // Mettre à jour currentUser
      currentUser = authResponse.user;
    }

    notifyListeners();
  }

  Future<void> refreshToken(String refreshToken) async {
    refreshTokenState = AppState.loading();
    notifyListeners();
    refreshTokenState = await refreshTokenUseCase.call(refreshToken);
    if (refreshTokenState.hasError) {
      notifyListeners();
      return;
    }
    if (refreshTokenState.hasNotNullData) {
      final userToken = UserToken(
        token: refreshTokenState.data!,
        refreshToken: refreshToken,
      );
      await storeUserToken(userToken);
    }
    notifyListeners();
  }

  Future<void> getMe() async {
    try {
      final state = await getCurrentUserUseCase.call();
      if (state.hasNotNullData) {
        currentUser = state.data!;
        await localStorageService.storeUser(state.data!);
        notifyListeners();
      }
    } catch (e) {
      // Erreur silencieuse
    }
  }

  Future<void> openApp(BuildContext context) async {
    final user = localStorageService.getUser();
    final token = localStorageService.getUserToken();

    if (user == null || token == null) {
      // Pas d'utilisateur enregistré, rediriger vers login
      if (context.mounted) {
        context.pushReplacementNamed(AppRoutes.loginRoute);
      }
      return;
    }
    // Utilisateur trouvé, mettre à jour currentUser
    currentUser = user;
    notifyListeners();
    // Rediriger vers Home
    if (context.mounted) {
      context.pushReplacementNamed(AppRoutes.homeRoute);
    }
    getMe();
  }

  Future<void> logout(BuildContext context) async {
    try {
      await logoutUseCase.call();
      localStorageService.logoutUser();
      if (context.mounted) {
        context.pushReplacementNamed(AppRoutes.loginRoute);
      }
    } catch (e) {
      Utils.printLog(e);
    }
    localStorageService.logoutUser();
    loginState = AppState();
    registerState = AppState();
    refreshTokenState = AppState();
    notifyListeners();
    if (context.mounted) {
      context.pushReplacementNamed(AppRoutes.loginRoute);
    }
  }

  void clearControllers() {
    emailController.clear();
    passwordController.clear();
  }

  Future<void> storeUserToken(UserToken userToken) async {
    await localStorageService.storeUserToken(userToken);
  }

  Future<void> storeUser(UserModel user) async {
    await localStorageService.storeUser(user);
  }
}
