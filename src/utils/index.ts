export function checkEnvironmentVariables() {
  return new Promise((resolve, reject) => {
    if (!(process.env.DATABASE_URL && process.env.JWT_SECRET_KEY)) {
      reject(
        new Error(
          "Initialization failed\n\nThe Environment variable is not set correctly!\nRead at README for more information"
        )
      );
    }
    resolve(null);
  });
}

export function createJWT() {
  let key = process.env.JWT_SECRET_KEY!;
}

export function verifyJWT(token: string) {}
