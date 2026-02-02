class UserToken {
  String token;
  String refreshToken;

  UserToken({
    required this.token,
    required this.refreshToken,
  });

  factory UserToken.fromJson(Map<String, dynamic> json) {
    return UserToken(
      token: json['token'] as String? ?? json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'token': token,
      'refreshToken': refreshToken,
    };
  }
}
