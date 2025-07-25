// @generated by protoc-gen-es v2.6.1
// @generated from file user-auth.proto (package auth, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv2";

/**
 * Describes the file user-auth.proto.
 */
export const file_user_auth = /*@__PURE__*/
  fileDesc("Cg91c2VyLWF1dGgucHJvdG8SBGF1dGgiBwoFRW1wdHkiNQoQVXNlckxvZ2luUmVxdWVzdBIPCgdlbWFpbElkGAEgASgJEhAKCHBhc3N3b3JkGAIgASgJIiYKElVzZXJTaWduVXBSZXNwb25zZRIQCghyZXNwb25zZRgBIAEoCSImChFVc2VyTG9nSW5SZXNwb25zZRIRCglzZXNzaW9uSWQYASABKAkiWwoRVXNlclNpZ25VcFJlcXVlc3QSEQoJZmlyc3ROYW1lGAEgASgJEhAKCGxhc3ROYW1lGAIgASgJEg8KB2VtYWlsSWQYAyABKAkSEAoIcGFzc3dvcmQYBCABKAkyjAEKC0F1dGhTZXJ2aWNlEjwKCVVzZXJMb2dJbhIWLmF1dGguVXNlckxvZ2luUmVxdWVzdBoXLmF1dGguVXNlckxvZ0luUmVzcG9uc2USPwoKVXNlclNpZ25VcBIXLmF1dGguVXNlclNpZ25VcFJlcXVlc3QaGC5hdXRoLlVzZXJTaWduVXBSZXNwb25zZWIGcHJvdG8z");

/**
 * Describes the message auth.Empty.
 * Use `create(EmptySchema)` to create a new message.
 */
export const EmptySchema = /*@__PURE__*/
  messageDesc(file_user_auth, 0);

/**
 * Describes the message auth.UserLoginRequest.
 * Use `create(UserLoginRequestSchema)` to create a new message.
 */
export const UserLoginRequestSchema = /*@__PURE__*/
  messageDesc(file_user_auth, 1);

/**
 * Describes the message auth.UserSignUpResponse.
 * Use `create(UserSignUpResponseSchema)` to create a new message.
 */
export const UserSignUpResponseSchema = /*@__PURE__*/
  messageDesc(file_user_auth, 2);

/**
 * Describes the message auth.UserLogInResponse.
 * Use `create(UserLogInResponseSchema)` to create a new message.
 */
export const UserLogInResponseSchema = /*@__PURE__*/
  messageDesc(file_user_auth, 3);

/**
 * Describes the message auth.UserSignUpRequest.
 * Use `create(UserSignUpRequestSchema)` to create a new message.
 */
export const UserSignUpRequestSchema = /*@__PURE__*/
  messageDesc(file_user_auth, 4);

/**
 * @generated from service auth.AuthService
 */
export const AuthService = /*@__PURE__*/
  serviceDesc(file_user_auth, 0);

