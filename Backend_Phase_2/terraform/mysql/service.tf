resource "kubernetes_service" "mysql" {
  metadata {
    name      = "hubflow-db"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "hubflow-mysql"
    }

    port {
      name        = "mysql"
      port        = 3306
      target_port = 3306
      protocol    = "TCP"
    }
  }
}