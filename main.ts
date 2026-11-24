const fs=require("node:fs"),p=require("node:path");
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
const T={0:[0,0,0],1:[1,0,1],2:[4,0,1],3:[0,1,0],4:[0,1,2],5:[0,2,2],6:[0,2,3],7:[0,3,3]};
for(let o=16;o<35;o++)T[o]=[0,o==23||o==27?1:2,1];
T[48]=[2,0,0];T[49]=[2,1,0];T[50]=[2,1,0];T[51]=[2,0,0];T[52]=[0,0,0];T[64]=[0,1,1];T[65]=[0,2,0];T[80]=[0,1,0];T[81]=[0,1,0];T[82]=[0,0,1];T[83]=[0,1,0];
function run(P,G){
const n=P.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),U=new Uint8Array(65536);let l=0,q=0,x=0,t=0;
const e=v=>({o:U.slice(0,l),e:v});
for(;;){
if(t==1e6)return e(10);
if(x<0||x>=n)return e(9);
const o=P[x],d=T[o];
if(!d)return e(5);
const m=d[0];
if(x+m>=n)return e(9);
t++;
const y=x+1+m;
if(s<d[1])return e(2);
if(s-d[1]+d[2]>256)return e(3);
x=y;
if(o==0)return e(0);
if(o==1){D[s++]=(P[y-1]<<24)>>24;continue;}
if(o==2){D[s++]=P[y-4]|P[y-3]<<8|P[y-2]<<16|P[y-1]<<24;continue;}
if(o==3){s--;continue;}
if(o==4){D[s]=D[s-1];s++;continue;}
if(o==5){const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;continue;}
if(o==6){D[s]=D[s-2];s++;continue;}
if(o==7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue;}
if(o==23){D[s-1]=-D[s-1]|0;continue;}
if(o==27){D[s-1]=~D[s-1];continue;}
if(o>=48&&o<=50){const r=((P[y-2]|P[y-1]<<8)<<16)>>16;let k=1;if(o!=48){const v=D[--s];k=o==49?v==0:v!=0;}if(k)x=y+r;continue;}
if(o==51){if(c==64)return e(7);C[c++]=y;x=P[y-2]|P[y-1]<<8;continue;}
if(o==52){if(c==0)return e(8);x=C[--c];continue;}
if(o==64){const a=D[s-1];if(a<0||a>=256)return e(6);D[s-1]=M[a];continue;}
if(o==65){const a=D[s-1],v=D[s-2];if(a<0||a>=256)return e(6);s-=2;M[a]=v;continue;}
if(o==80){const b=Buffer.from(String(D[s-1]));if(l+b.length>65536)return e(11);s--;U.set(b,l);l+=b.length;continue;}
if(o==81){if(l+1>65536)return e(11);U[l++]=D[--s]&255;continue;}
if(o==82){D[s++]=q<G.length?G[q++]:-1;continue;}
if(o==83)return e(D[--s]&255);
const b=D[s-1],a=D[s-2];let r;
if(o==16)r=a+b|0;
else if(o==17)r=a-b|0;
else if(o==18)r=Math.imul(a,b);
else if(o==19){if(b==0)return e(4);r=a==-2147483648&&b==-1?a:(a/b)|0;}
else if(o==20){if(b==0)return e(4);r=b==-1?0:a%b|0;}
else if(o==21){if(b==0)return e(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(o==22){if(b==0)return e(4);r=(a>>>0)%(b>>>0)|0;}
else if(o==24)r=a&b;
else if(o==25)r=a|b;
else if(o==26)r=a^b;
else if(o==28)r=a<<(b&31);
else if(o==29)r=a>>(b&31);
else if(o==30)r=(a>>>(b&31))|0;
else if(o==32)r=a==b?1:0;
else if(o==33)r=a<b?1:0;
else r=a>>>0<b>>>0?1:0;
s-=2;D[s++]=r;
}
}
for(const d of fs.readdirSync(I)){
const f=p.join(I,d);
if(!fs.statSync(f).isDirectory())continue;
const P=fs.readFileSync(p.join(f,"program.bin"));
const G=fs.existsSync(p.join(f,"input.bin"))?fs.readFileSync(p.join(f,"input.bin")):Buffer.alloc(0);
const r=run(P,G),o=p.join(O,d);
fs.mkdirSync(o,{recursive:true});
fs.writeFileSync(p.join(o,"stdout.bin"),r.o);
fs.writeFileSync(p.join(o,"exit.txt"),String(r.e)+"\n");
}
