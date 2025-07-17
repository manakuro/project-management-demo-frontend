package testuserrepository

import (
	"project-management-demo-backend/ent"
	ur "project-management-demo-backend/pkg/usecase/repository"
)

type testUserRepository struct {
	client *ent.Client
}

// New generates test user repository.
func New(client *ent.Client) ur.TestUser {
	return &testUserRepository{client: client}
}
