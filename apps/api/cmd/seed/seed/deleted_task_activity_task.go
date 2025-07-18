package seed

import (
	"context"
	"log"
	"project-management-demo-backend/ent"
)

// DeletedTaskActivityTask generates activity data.
func DeletedTaskActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.DeletedTaskActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("DeletedTaskActivityTask failed to delete data: %v", err)
	}
}
