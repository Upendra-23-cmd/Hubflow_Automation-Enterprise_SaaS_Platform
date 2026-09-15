resource "kubernetes_service" "app" {
  metadata {
    name      = "hubflow-app"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = "hubflow-app"
    }

    port {
      name        = "http"
      port        = 3000
      target_port = 3000
      protocol    = "TCP"
    }
  }
}