const fs=require("fs"),E=process.env,I=E.MAKEFUN_INPUT_DIR||"/input",O=E.MAKEFUN_OUTPUT_DIR||"/output";
const T="$5e(*./3########-------)---)---#---#############DHHD$###########),##############((%(";
function run(P,G){
const n=P.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),U=new Uint8Array(65536);let l=0,q=0,x=0,t=0;
const e=v=>[U.slice(0,l),v];
for(;;){
if(t==1e6)return e(10);
if(x<0||x>=n)return e(9);
const o=P[x];
if(o>83||T[o]=="#")return e(5);
const k=T.charCodeAt(o)-36,m=k>>4;
if(x+m>=n)return e(9);
t++;
const y=x+1+m,u=(k>>2)&3,w=k&3;
if(s<u)return e(2);
if(s-u+w>256)return e(3);
x=y;
if(!o)return e(0);
else if(o==1)D[s++]=(P[y-1]<<24)>>24;
else if(o==2)D[s++]=P[y-4]|P[y-3]<<8|P[y-2]<<16|P[y-1]<<24;
else if(o==3)s--;
else if(o==4){D[s]=D[s-1];s++;}
else if(o==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
else if(o==6){D[s]=D[s-2];s++;}
else if(o==7)[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
else if(o==23||o==27)D[s-1]=o==23?-D[s-1]|0:~D[s-1];
else if(o>=48&&o<=50){if(o==48||!D[--s]==(o==49))x=y+((P[y-2]|P[y-1]<<8)<<16>>16);}
else if(o==51){if(c==64)return e(7);C[c++]=y;x=P[y-2]|P[y-1]<<8;}
else if(o==52){if(c==0)return e(8);x=C[--c];}
else if(o==64){const a=D[s-1];if((a>>>0)>255)return e(6);D[s-1]=M[a];}
else if(o==65){const a=D[s-1],v=D[s-2];if((a>>>0)>255)return e(6);s-=2;M[a]=v;}
else if(o==80){const b=Buffer.from(""+D[s-1]);if(l+b.length>65536)return e(11);s--;U.set(b,l);l+=b.length;}
else if(o==81){if(l+1>65536)return e(11);U[l++]=D[--s]&255;}
else if(o==82)D[s++]=q<G.length?G[q++]:-1;
else if(o==83)return e(D[--s]&255);
else{
const b=D[s-1],a=D[s-2];let r;
if(b==0&&o>18&&o<23)return e(4);
r=o==16?a+b|0:o==17?a-b|0:o==18?Math.imul(a,b):o==19?a==-2147483648&&b==-1?a:(a/b)|0:o==20?b==-1?0:a%b:o==21?(a>>>0)/(b>>>0)|0:o==22?(a>>>0)%(b>>>0)|0:o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<(b&31):o==29?a>>(b&31):o==30?(a>>>(b&31))|0:o==32?a==b?1:0:o==33?a<b?1:0:a>>>0<b>>>0?1:0;
s-=2;D[s++]=r;
}
}
}
for(const d of fs.readdirSync(I)){
const f=I+"/"+d;
if(!fs.statSync(f).isDirectory())continue;
const P=fs.readFileSync(f+"/program.bin");
const G=fs.existsSync(f+"/input.bin")?fs.readFileSync(f+"/input.bin"):Buffer.alloc(0);
const r=run(P,G),o=O+"/"+d;
fs.mkdirSync(o,{recursive:!0});
fs.writeFileSync(o+"/stdout.bin",r[0]);
fs.writeFileSync(o+"/exit.txt",r[1]+"\n");
}
