import * as bcrypt from 'bcrypt';

export async function encrypt(
  unsafePassword: string,
  saltRounds: number = 10,
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(unsafePassword, salt);

  return hashedPassword;
}
