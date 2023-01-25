## Приложение для отзывов на книги, фильмы, игры и т.д.
- Посетители сайта видят все отзывы, комментарии, лайки. 
- Только зарегистрированные пользователи могут оставить отзыв, комментарии, оценить сам отзыв лайком или поставить рейтинг тому контенту, который описан в отзыве. 
- Категории отзывов, может добавить только администратор. Администратор видит список всех пользователей, может зайти к ним на страницу и отредактировать отзыв.
- Зарегистрироваться в приложении можно, использую аккаунты Google, Twitter, GitHub. 
- У каждого пользователя есть своя страница, где он может посмотреть свои отзывы и отредактировать их.
- На главной странице отображаются последние добавленные отзывы, отзывы с самым большим рейтингом, который поставил автор и облако тэгов. 
- Сайт двуязычный (русский и английский). 
- Шапка профиля липкая, сайт адаптивен, есть бургер-меню. Во время ожидания ответов от сервера отображаются скелетоны. 
- Сайт написан на React, Node.js, Express, Postgresql, для работы с базой данной используется ORM-библиотека Sequelize. В качестве менеджера состояний используется Redux Toolkit, запросы к базе данных идут через createAsyncThunk и RTK Query. 
- Для регистрации используется passport.js. 
- Для стилизации используется компоненты из библиотеки MUI. 
- Изображения, используемые в отзывах хранятся в облаке Cloudinary.

---


## Application for reviews of books, movies, games, etc.
- Site visitors see all reviews, comments, likes. 
- Only registered users can write a review, comments, rate the review itself with a like or give a rating to the content described in the review.
- Categories of reviews, can only be added by the administrator. The administrator sees a list of all users, can go to their page and edit the review.
- You can register in the application using Google, Twitter, GitHub accounts. 
- Each user has their own page where they can view their reviews and edit them.
- The main page displays the latest added reviews, reviews with the highest rating that the author put and the tag cloud. 
- The site is bilingual (Russian and English). 
- The profile header is sticky, the site is adaptive, there is a burger menu. While waiting for responses from the server, skeletons are displayed. 
- The site is written in React, Node.js, Express, Postgresql, Sequelize ORM library is used to work with this database. The Redux Toolkit is used as a state manager, queries to the database go through createAsyncThunk and RTK Query. 
- Used for registration passport.js . 
- Components from the MUI library are used for styling. 
- Images used in reviews are stored in the Cloudinary cloud.
