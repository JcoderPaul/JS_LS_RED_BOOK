### Авторизация в NPM

Авторизация (аутентификация) в NPM необходима для доступа к приватным пакетам, публикации своих модулей в реестр npmjs.com или управления аккаунтом. 

NPM использует учетные записи на сайте npmjs.com. Если у вас нет аккаунта, сначала зарегистрируйтесь на [npmjs.com](https://www.npmjs.com/signup) — это бесплатно. После регистрации вам придет email для верификации.

#### Основные способы авторизации через CLI (командную строку):

NPM сохраняет учетные данные в файле `.npmrc` (в домашней директории пользователя), чтобы не вводить их каждый раз.

1. **Базовая авторизация (логин с паролем)**:
   - Выполните команду:

     ```
     npm login
     ```
   - Введите:
     - Username: ваш логин (нижний регистр, может содержать дефисы и цифры).
     - Password: пароль аккаунта.
     - Email: email, привязанный к аккаунту.
   - Если включена двухфакторная аутентификация (2FA), введите одноразовый пароль (OTP) из приложения-аутентификатора (например, Google Authenticator).
   - После успеха credentials сохраняются в `.npmrc` в зашифрованном виде (как токен `//registry.npmjs.org/:_authToken=...`).

   **Примечание**: С версии npm 8.14+ по умолчанию используется браузерная авторизация для безопасности. Чтобы использовать legacy-режим (CLI), добавьте флаг `--auth-type=legacy`:
   ```
   npm login --auth-type=legacy
   ```

2. **Авторизация через токен (рекомендуется для CI/CD, скриптов или контейнеров)**:
   - Зайдите в аккаунт на [npmjs.com](https://www.npmjs.com), кликните на аватар → "Access Tokens" → "Generate New Token".
   - Выберите тип токена (Read-and-Publish для публикации, Read-Only для чтения).
   - Скопируйте токен (он показывается только раз!).
   - В CLI выполните:

     ```
     npm login --auth-token=YOUR_TOKEN_HERE
     ```
   - Или вручную добавьте в `.npmrc`:

     ```
     //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
     ```
   - Это удобно для автоматизации (например, в Docker или GitHub Actions), так как не требует ввода пароля и OTP.

3. **Авторизация в scoped-реестре (приватный реестр, например, для организации)**:
   - Для scoped-пакетов (например, `@mycompany/package`):

     ```
     npm login --scope=@mycompany --registry=https://registry.mycompany.com
     ```
   - Укажите username, password и email для этого реестра.

4. **Включение двухфакторной аутентификации (2FA)**:
   - Рекомендуется для безопасности. В CLI:

     ```
     npm profile enable-2fa auth-and-writes
     ```
   - Или на сайте: Аватар → "Two-Factor Authentication".
   - При логине с 2FA используйте OTP. Для веб-логина: `npm login --auth-type=web` — откроется браузер.

5. **Выход из аккаунта**:

   ```
   npm logout
   ```
   - Это очистит токен из `.npmrc`.

**Проверка авторизации**:
- `npm whoami` — покажет текущего пользователя.
- `npm config ls -l` — просмотрит конфигурацию, включая токены (будьте осторожны, не делитесь выводом).
- Если ошибка "Incorrect username or password", проверьте учетные данные или сбросьте пароль на сайте.

**Автоматизация (non-interactive логин)**:
- Для скриптов или CI можно передать данные через echo (небезопасно для продакшена):

  ```
  echo -e 'USERNAME\nPASSWORD\nEMAIL' | npm login
  ```
- Лучше используйте токены или переменные окружения (например, `NPM_TOKEN` в GitHub Actions).

### Управление профилем:

Профиль — это настройки вашего аккаунта на npmjs.com. Вы можете управлять им через веб-интерфейс или CLI (требуется npm версии 5.5.1+; обновите: `npm install -g npm@latest`).

#### Через веб-интерфейс (npmjs.com):

1. Залогиньтесь на [npmjs.com](https://www.npmjs.com).
2. Кликните на аватар в правом верхнем углу → "Profile".
3. Доступные разделы:
   - **Account Settings**: Изменение имени, email, пароля, 2FA, интеграции (GitHub, Twitter).
   - **Access Tokens**: Создание/удаление токенов для CLI.
   - **Packages**: Список опубликованных пакетов, статистика скачиваний.
   - **Organizations**: Если у вас есть орг-аккаунт для команды.
   - **Billing & Plans**: Платные опции (например, приватные пакеты).
   - **Security**: Аудит, 2FA, восстановление аккаунта.
4. Для сброса пароля: Аватар → "Account" → "Change Password".
5. Интеграция с GitHub: В "Account" → "Link GitHub Account".

#### Через CLI:

- **Просмотр профиля**:

  ```
  npm profile get
  ```
  - Покажет JSON с данными: имя, email, 2FA-статус и т.д.

- **Изменение свойств**:

  ```
  npm profile set <property> <value>
  ```
  - Примеры:
    - `npm profile set fullname "Иван Иванов"` — полное имя.
    - `npm profile set email new@example.com` — email.
    - `npm profile set homepage https://example.com` — домашняя страница.
    - `npm profile set password` — смена пароля (введите старый и новый).
  - При 2FA введите OTP, когда попросят.

- **Другие команды**:
  - `npm profile enable-2fa` — включить 2FA.
  - `npm profile disable-2fa` — отключить (не рекомендуется).

**Советы по безопасности**:
- Никогда не коммитьте `.npmrc` в репозиторий (используйте `.gitignore`).
- Для приватных реестров (например, Verdaccio, Nexus) настройте отдельный `.npmrc`.
- Если проблемы с логином, проверьте прокси/VPN или обновите NPM.

Официальная документация: [docs.npmjs.com](https://docs.npmjs.com).

См. статьи:
- [Package Management & Authentication Guide](https://ioflood.com/blog/npm-login/)
- [Give credentials to npm login command line](https://stackoverflow.com/questions/54540096/give-credentials-to-npm-login-command-line)
- [Managing your profile settings](https://docs.npmjs.com/managing-your-profile-settings)
- [npm Security](https://help.sonatype.com/en/npm-security.html)
- [Logging in and out](https://npm.github.io/installation-setup-docs/installing/logging-in-and-out.html)