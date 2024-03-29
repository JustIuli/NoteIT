import * as bcrypt from 'bcrypt';

export async function matchPasswords(
  unhashedPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(hashedPassword, unhashedPassword);
}
