package main

import (
	"net/http"
	"strconv"

	"github.com/Frug/photolib/photos"
	"github.com/labstack/echo"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/oauth2"
)

var (
	oauthCfg *oauth2.Config
)

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
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
	e.Logger.Fatal(e.Start(":8080"))
}
