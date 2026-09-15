resource "kubernetes_stateful_set" "mysql" {
  metadata {
    name      = "hubflow-mysql"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  spec {
    service_name = kubernetes_service.mysql.metadata[0].name

    replicas = 1

    selector {
      match_labels = {
        app = "hubflow-mysql"
      }
    }

    template {
      metadata {
        labels = {
          app = "hubflow-mysql"
        }
      }

      spec {
        container {
          name  = "mysql"
          image = "mysql:8.0"

          port {
            container_port = 3306
            name           = "mysql"
          }

          env {
            name = "MYSQL_ROOT_PASSWORD"

            value_from {
              secret_key_ref {
                name = kubernetes_secret.hubflow.metadata[0].name
                key  = "MYSQL_ROOT_PASSWORD"
              }
            }
          }

          env {
            name = "MYSQL_DATABASE"

            value_from {
              config_map_key_ref {
                name = kubernetes_config_map.hubflow.metadata[0].name
                key  = "MYSQL_DATABASE"
              }
            }
          }

          env {
            name = "MYSQL_USER"

            value_from {
              config_map_key_ref {
                name = kubernetes_config_map.hubflow.metadata[0].name
                key  = "MYSQL_USER"
              }
            }
          }

          env {
            name = "MYSQL_PASSWORD"

            value_from {
              secret_key_ref {
                name = kubernetes_secret.hubflow.metadata[0].name
                key  = "MYSQL_PASSWORD"
              }
            }
          }

          resources {
            requests = {
              cpu    = "250m"
              memory = "512Mi"
            }

            limits = {
              cpu    = "1"
              memory = "1Gi"
            }
          }

          volume_mount {
            name       = "mysql-storage"
            mount_path = "/var/lib/mysql"
          }

          readiness_probe {
            exec {
              command = [
                "sh",
                "-c",
                "mysqladmin ping -h 127.0.0.1 -uroot -p\"$MYSQL_ROOT_PASSWORD\""
              ]
            }

            initial_delay_seconds = 20
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 6
          }

          liveness_probe {
            exec {
              command = [
                "sh",
                "-c",
                "mysqladmin ping -h 127.0.0.1 -uroot -p\"$MYSQL_ROOT_PASSWORD\""
              ]
            }

            initial_delay_seconds = 60
            period_seconds        = 20
            timeout_seconds       = 5
            failure_threshold     = 3
          }
        }

        volume {
          name = "mysql-storage"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.mysql.metadata[0].name
          }
        }
      }
    }
  }
}