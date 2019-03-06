package auth

import (
	"context"
	"math/rand"
	"strings"
	"text/template"

	"github.com/google/go-github/v24/github"
	"github.com/labstack/echo"
	"golang.org/x/oauth2"
)

var (
	clientSecret string
	clientID     string
	oauthCfg     *oauth2.Config

	// scopes
	scopes = []string{"read:user"}

	tmpls = map[string]*template.Template{}
)

const (
	githubAuthorizeUrl = "https://github.com/login/oauth/authorize"
	githubTokenUrl     = "https://github.com/login/oauth/access_token"
	//redirectUrl        = ""
)

type AuthResponse struct {
	AuthCode string `json:"code"`
}

func SetCredentials(id string, secret string) {
	clientSecret = secret
	clientID = id
}

func getOauthConfig() (oauthCfg *oauth2.Config) {
	return &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint: oauth2.Endpoint{
			AuthURL:  githubAuthorizeUrl,
			TokenURL: githubTokenUrl,
		},
		//RedirectURL: redirectUrl,
		Scopes: scopes,
	}
}

func GetGithubLoginUrl() (url string) {
	// TODO: State should be random and validated when users return
	state := randomString(16)
	return getOauthConfig().AuthCodeURL(state)
}

func DoAuth(accessToken string) (err error) {

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: accessToken},
	)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	// list all repositories for the authenticated user
	repos, _, err := client.Repositories.List(ctx, "", nil)
	if err != nil {
		return err
	}

	panic(repos)
}

func randomString(len int) string {
	bytes := make([]byte, len)
	for i := 0; i < len; i++ {
		bytes[i] = byte(65 + rand.Intn(25)) //A=65 and Z = 65+25
	}
	return string(bytes)
}

func CheckAuthHeader(c echo.Context) bool {
	// TODO: This should be calling github's api
	authToken := strings.Replace(c.Request().Header.Get("Authorization"), "Bearer ", "", -1)
	return authToken != ""
}

// CheckAuth is middleware for echo's router
func CheckAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if err := next(c); err != nil {
			c.Error(err)
		}

		if !CheckAuthHeader(c) {
			// TODO: This should call github's api to validate authToken
			c.Error(echo.ErrUnauthorized)
		}

		return next(c)
	}
}
