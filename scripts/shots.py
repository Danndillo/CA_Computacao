import sys, json
from playwright.sync_api import sync_playwright
pages = ['inicio','sobre','integrantes','noticias','eventos','projetos','documentos','complementares','contato','noticia-modelo-urgente']
out = '/tmp/claude-0/shots'
report = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ['light','dark']:
        for name,(w,h) in {'d':(1280,900),'m':(400,800)}.items():
            if scheme=='dark' and name=='m' : pass
            ctx = b.new_context(viewport={'width':w,'height':h}, color_scheme=scheme)
            pg = ctx.new_page()
            errs=[]
            pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('pageerror', lambda e: errs.append(str(e)))
            for pa in pages:
                pg.goto(f'file:///home/claude/ca-computacao/dist/index.html#{pa}')
                pg.wait_for_timeout(900)
                ov = pg.evaluate('document.documentElement.scrollWidth - window.innerWidth')
                report[f'{scheme}-{name}-{pa}'] = ov
                if scheme=='light' or pa in ('inicio','complementares'):
                    pg.screenshot(path=f'{out}/{scheme}-{name}-{pa}.png', full_page=True)
            report[f'{scheme}-{name}-errors'] = [e for e in errs if 'fonts' not in e and 'ERR_' not in e][:5]
            ctx.close()
    b.close()
bad = {k:v for k,v in report.items() if (isinstance(v,int) and v>0) or (isinstance(v,list) and v)}
print(json.dumps(bad, indent=1, ensure_ascii=False))
