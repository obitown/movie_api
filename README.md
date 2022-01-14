Objective
=========

To build the server-side comonents of a \"movies\" web application. The
web application will provide useres with access to information about
different movies, directors, and genres.\
Users will be able to sign up, update their personal info, and creat a
list of their favorite movies.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  Request        URL                               HTTP Method    Response       Examples
  -------------- --------------------------------- -------------- -------------- --------------------------------------------------------------------------
  Create a new   /users/                           POST\          Returns new    ![](https://i.imgur.com/TADZ8KO.png)![](https://i.imgur.com/XtDaCuk.png)
  user.\                                                          user info in   
                                                                  JSON.\         

  Create movie   /user/:Username/mvoies/:movieID   POST\          Returns        ![](https://i.imgur.com/jS7YUDk.png)
  on users                                                        updated user   
  favorite                                                        info.\         
  list.\                                                                         

  Get a list of  /movies                           GET\           Returns a JSON ![](https://i.imgur.com/HvW5GJe.png)
  all movies.\                                                    list of movies 
                                                                  and their      
                                                                  info.\         

  Get a list of  /users\                           GET\           Returns a JSON ![](https://i.imgur.com/3wXitad.png)
  all users.                                                      list of        
                                                                  users.\        

  Get a user by  /users/:Username\                 GET\           Returns        ![](https://i.imgur.com/a8Rb9BR.png)
  username\                                                       specific user  
                                                                  by username\   

  Get a movie by /movies/:title\                   GET\           Returns        ![](https://i.imgur.com/T7E8uno.png)
  Title\                                                          specific movie 
                                                                  by Title.\     

  Get genre by   /movies/genre/:genreName\         GET            Returns        ![](https://i.imgur.com/pSjU6C5.png)
  name\                                                           description of 
                                                                  specific genre 

  Get director   movies/directors/:directorName    GET\           Returns        ![](https://i.imgur.com/6s095WE.png)
  by name                                                         specific       
                                                                  director and   
                                                                  info           

  Update users   user/:Username                    PUT\           Returns        ![](https://i.imgur.com/JRMr3ma.png)![](https://i.imgur.com/LDah944.png)
  info by                                                         updated        
  username                                                        information of 
                                                                  specified user 

  Delete movie   user/:Username/movies/:movieID\   DELETE         Returns        ![](https://i.imgur.com/vHI1plh.png)
  from Favorite                                                   updated        
  movie list                                                      Favorite movie 
                                                                  list\          

  Delete user by user/:Username\                   DELETE         Removes user   ![](https://i.imgur.com/hjG0jl4.png)
  Username                                                        from user list 
  ---------------------------------------------------------------------------------------------------------------------------------------------------------
