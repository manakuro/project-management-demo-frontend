package controller

import (
	"github.com/labstack/echo/v4"
)

// Context represents the context of the current HTTP request. It holds request and
// response objects, path, path parameters, data and registered handler.
type Context = echo.Context
