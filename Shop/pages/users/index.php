<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
      integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
      crossorigin="anonymous"
    />

    <style>
      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="row m-5">
      <div class="col-3">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            class="nav-link"
            id="profileTab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
            >Профиль</a
          >
          <a
            class="nav-link"
            id="messagesTab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
            >Сообщения</a
          >
          <a
            class="nav-link"
            id="settingsTab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
            >Настройки</a
          >
        </div>
      </div>
      <div class="col-9">
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <section class="row">
              <div class="col-sm-4">
                <img
                  src="../../img/blog/author.png"
                  alt="аватар"
                  width="100%"
                />
              </div>
              <div class="col-sm-8">
                <?php if (count($_SESSION) != 0) { ?>
                  <h2>Вы авторизованы</h2>
                  <h4>Id: <?php echo $_SESSION["id"]; ?></h4>
                  <p>Имя и фамилия: <?php echo $_SESSION["name"] . " " . $_SESSION["lastname"]; ?></p>
                  <p>Email: <?php echo $_SESSION["email"]; ?></p>
                  <p>
                    Следующие данные из БД записаны в сессию пользователя: <br>
                    Id: <?php echo $_SESSION["id"]; ?><br>
                    Имя: <?php echo $_SESSION["name"]; ?><br>
                    Фамилия: <?php echo $_SESSION["lastname"]; ?><br>
                    Email: <?php echo $_SESSION["email"]; ?><br>
                  </p>
                  <p>
                    Кроме того, для сохранения сессии после закрытия браузера установлена сессионная кука c id сессии.
                    По умолчанию сессии живут до закрытия браузера, хотя в некоторых браузерах есть настройка что-то типа "начать с того же места",
                    которая, если активна, сохраняет сессию после закрытия. Но, чтобы не зависеть от этого, информацию хранят в куки. Как я понял, 
                    такой вариант авторизации работает в реальности. Понятно, что это сильно упрощенно, что надо генерировать
                    токен, какие-то схемы шифрования делать, еще куча настроек в php.ini, но это уже задача скорее для бекенд-разработчика.
                  </p>
                  <p>Пока сессия жива, при переходе по ссылке /auth пользователь будет перенаправлен в личный кабинет (то есть, сюда)</p>
                  <p>При нажатии кнопки "Выйти из аккаунта" произойдет очистка и destroy сессии, и вы будете перенаправлены на страницу авторизации</p>
                  <p>При регистрации нового пользователя сессия (если активна) также сбрасывается</p>
                  <div class="w-50">
                    <a class="btn btn-info btn-block" href="/">На главную</a>
                    <div class="btn btn-info btn-block" onclick="logOut()">Выйти из аккаунта</div>
                  </div>
                <?php } ?> 
              </div>
            </section>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <section class="row">
              <div class="col-md-6">
                <div class="row border-bottom">
                  <div class="col-4"><img src="../../img/r2.jpg" alt="" /></div>
                  <div class="col-8">
                    <h5>Семен Семеныч</h5>
                    <p>Завтра уеду за город, не смогу.</p>
                  </div>
                </div>
                <div class="row border-bottom">
                  <div class="col-4"><img src="../../img/r3.jpg" alt="" /></div>
                  <div class="col-8">
                    <h5>Некто Ирина</h5>
                    <p>Жду завтра, как договорились в 15.00</p>
                  </div>
                </div>
                <div class="row border-bottom">
                  <div class="col-4"><img src="../../img/r8.jpg" alt="" /></div>
                  <div class="col-8">
                    <h5>Паша Гараж</h5>
                    <p>Завтра на 15 у нас все в силе?</p>
                  </div>
                </div>
                <div class="row border-bottom">
                  <div class="col-4">
                    <img src="../../img/r10.jpg" alt="" />
                  </div>
                  <div class="col-8">
                    <h5>Катерина</h5>
                    <p>Завтра мы на рыбалку едем?</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-10 ml-auto">
                    <textarea
                      rows="4"
                      placeholder="Текст сообщения"
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="col-10 ml-auto mt-2">
                    <input
                      type="submit"
                      value="Отправить сообщение"
                      class="btn btn-success btn-block"
                    />
                  </div>
                </div>
              </div>
            </section>
            <p class="py-5 display-3">Список друзей:</p>
            <section class="row">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <div class="row">
              <div class="col-5">
                <div class="btn btn-info btn-block">Сделать красиво</div>
                <div class="btn btn-info btn-block">Сделать еще лучше</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
      crossorigin="anonymous"
    ></script>

    <script>
      let pathName = location.pathname.split("/")[2];

      addEventListener("popstate", (event) => {
        pathName = location.pathname.split("/")[2];
        if (pathName == "profile") {
          $("#profileTab").tab("show");
        } else if (pathName == "messages") {
          $("#messagesTab").tab("show");
        } else if (pathName == "settings") {
          $("#settingsTab").tab("show");
        }
      });

      if (pathName == "profile") {
        $("#v-pills-profile").tab("show");
      } else if (pathName == "messages") {
        $("#v-pills-messages").tab("show");
      } else if (pathName == "settings") {
        $("#v-pills-settings").tab("show");
      } else {
        location.href = location.protocol + "//" + location.host;
      }

      document.getElementById(pathName + "Tab").classList.add("active");

      let navLinks = document.querySelectorAll(".nav-link");

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", () => {
          let page = navLinks[i]
            .getAttribute("aria-controls")
            .split("v-pills-")[1];
          history.pushState("", "", page);
        });
      }
      
      async function logOut() {
        await fetch("../../php/logOut.php");
        location.href = location.protocol + "//" + location.host + "/auth";
      }

    </script>
  </body>
</html>
