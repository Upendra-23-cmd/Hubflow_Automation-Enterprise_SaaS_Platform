resource "kubernetes_persistent_volume_claim" "mysql" {
  metadata {
    name      = "mysql-data"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}