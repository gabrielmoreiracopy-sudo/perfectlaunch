import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nenhum projeto criado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Crie o primeiro lançamento para liberar estratégia, oferta, conteúdo, funil e acompanhamento.
        </p>
        <Button asChild>
          <Link href="/projects">Criar projeto</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
