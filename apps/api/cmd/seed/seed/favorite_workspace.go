package seed

import (
	"context"
	"log"
	"project-management-demo-backend/cmd/seed/seedutil"
	"project-management-demo-backend/ent"
)

// FavoriteWorkspace generates favorite workspace data.
func FavoriteWorkspace(ctx context.Context, client *ent.Client) {
	_, err := client.FavoriteWorkspace.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("FavoriteWorkspace failed to delete data: %v", err)
	}

	inputs := []ent.CreateFavoriteWorkspaceInput{
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
		},
	}
	bulk := make([]*ent.FavoriteWorkspaceCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.FavoriteWorkspace.Create().SetInput(t)
	}
	if _, err = client.FavoriteWorkspace.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("FavoriteWorkspace failed to seed data: %v", err)
	}
}
