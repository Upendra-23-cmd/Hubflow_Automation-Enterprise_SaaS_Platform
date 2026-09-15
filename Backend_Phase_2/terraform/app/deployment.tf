resource "kubernetes_deployment" "app" {
  metadata {
    name      = "hubflow-app"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  spec {
    replicas = var.app_replicas

    selector {
      match_labels = {
        app = "hubflow-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "hubflow-app"
        }
      }

      spec {
        container {
          name  = "hubflow-app"
          image = var.app_image

          image_pull_policy = "Always"

          port {
            container_port = 3000
            name           = "http"
          }

          env {
            name = "PORT"

            value_from {
              config_map_key_ref {
                name = kubernetes_config_map.hubflow.metadata[0].name
                key  = "PORT"
              }
            }
          }

          env {
            name = "NODE_ENV"

            value_from {
              config_map_key_ref {
                name = kubernetes_config_map.hubflow.metadata[0].name
                key  = "NODE_ENV"
              }
            }
          }

          env {
            name = "JWT_EXPIRES_IN"

            value_from {
              config_map_key_ref {
                name = kubernetes_config_map.hubflow.metadata[0].name
                key  = "JWT_EXPIRES_IN"
              }
            }
          }

          env {
            name = "JWT_SECRET"

            value_from {
              secret_key_ref {
                name = kubernetes_secret.hubflow.metadata[0].name
                key  = "JWT_SECRET"
              }
            }
          }

          env {
            name = "DATABASE_URL"

            value = "mysql://${var.mysql_user}:${var.mysql_password}@hubflow-db:3306/${var.mysql_database}"
          }

          resources {
            requests = {
              cpu    = "250m"
              memory = "256Mi"
            }

            limits = {
              cpu    = "1"
              memory = "512Mi"
            }
          }

          readiness_probe {
            tcp_socket {
              port = 3000
            }

            initial_delay_seconds = 10
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 3
          }

          liveness_probe {
            tcp_socket {
              port = 3000
            }

            initial_delay_seconds = 30
            period_seconds        = 20
            timeout_seconds       = 5
            failure_threshold     = 3
          }
        }
      }
    }
  }
}