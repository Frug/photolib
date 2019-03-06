package main

import (
	"net/http"
	"strconv"

	"github.com/Frug/photolib/auth"
	"github.com/Frug/photolib/photos"
	"github.com/labstack/echo"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	e := echo.New()

	//auth.SetCredentials(os.Getenv("CLIENT_ID"), os.Getenv("CLIENT_SECRET"))
	auth.SetCredentials("5625c7c1565c0b09747c", "141b6a0490d4714ed95db00d84fbc279845af938")

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Golang app is up")
	})

	e.GET("/login", func(c echo.Context) error {
		return c.Redirect(http.StatusTemporaryRedirect, auth.GetGithubLoginUrl())
	})

	e.GET("/auth/callback", func(c echo.Context) error {
		authCode := c.QueryParam("code")
		if authCode == "" {
			return c.String(http.StatusUnauthorized, "Not authorized")
		}
		return c.JSON(http.StatusOK, &auth.AuthResponse{AuthCode: authCode})
	})

	e.GET("/photos", func(c echo.Context) error {
		page, _ := strconv.Atoi(c.QueryParam("page"))
		p, err := photos.GetPhotos(page)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, p)
	})

	e.POST("/photos", func(c echo.Context) (err error) {
		p := new(photos.Photo)
		if err := c.Bind(p); err != nil {
			return err
		}
		if err = photos.PostPhoto(p); err != nil {
			return err
		}

		return c.JSON(http.StatusOK, p)
	})

	e.DELETE("/photos", func(c echo.Context) (err error) {
		if err = photos.DeletePhotos(); err != nil {
			return err
		}

		return c.JSON(http.StatusNoContent, nil)
	})
	e.Logger.Fatal(e.Start(":8081"))
}
